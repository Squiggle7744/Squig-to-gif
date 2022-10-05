import dynamic from "next/dynamic";
import React, { useState } from "react";
import { SquigLookup } from "../GraphQL/queries";
import { checkSquig } from "../squigChecker";
import graphQLClient from "../GraphQL/graphQLClient";
import { NewSquigButton } from "../components/NewSquigButton";

const Sketch = dynamic(() => import("../p5/p5-react.jsx"), { ssr: false });

export async function getServerSideProps(context) {
  const validatedTokenID = checkSquig(context.params.tokenid);
  const fetchedSquig = await graphQLClient.request(
    SquigLookup(validatedTokenID)
  );

  return {
    props: { fetchedSquig },
  };
}

const Token = (props) => {
  const [tokenID, setID] = useState(
    props.fetchedSquig.token.token.metadata.tokenID
  );

  let tokenData = {
    tokenId: props.fetchedSquig.token.token.metadata.tokenID,
    hashes: [props.fetchedSquig.token.token.metadata.token_hash],
  };

  //
  // Squiggle Script Data below

  let numHashes = tokenData.hashes.length;
  let hashPairs = [];
  for (let i = 0; i < numHashes; i++) {
    for (let j = 0; j < 32; j++) {
      hashPairs.push(tokenData.hashes[i].slice(2 + j * 2, 4 + j * 2));
    }
  }
  let decPairs = hashPairs.map((x) => {
    return parseInt(x, 16);
  });

  let seed = parseInt(tokenData.hashes[0].slice(0, 16), 16);
  let color;
  let backgroundIndex = 0;
  let backgroundArray = [
    255, 225, 200, 175, 150, 125, 100, 75, 50, 25, 0, 25, 50, 75, 100, 125, 150,
    175, 200, 225,
  ];
  let index = 0;
  let ht;
  let wt = 2;
  let speed = 1;
  let segments;
  let amp = 1;
  let direction = 1;
  let loops = true;
  let startColor = decPairs[29];
  let reverse = decPairs[30] < 128;
  let slinky = decPairs[31] < 35;
  let pipe = decPairs[22] < 32;
  let bold = decPairs[23] < 15;
  let segmented = decPairs[24] < 30;
  let fuzzy = pipe && !slinky;

  async function draw(p5) {
    color = 0;
    p5.background(backgroundArray[backgroundIndex]);
    let div = Math.floor(p5.map(Math.round(decPairs[24]), 0, 230, 3, 20));
    let steps = slinky ? 50 : fuzzy ? 1000 : 200;
    p5.translate(p5.width / 2 - p5.width / wt / 2, p5.height / 2);
    for (let j = 0; j < segments - 2; j++) {
      for (let i = 0; i <= steps; i++) {
        let t = i / steps;
        let x = p5.curvePoint(
          (p5.width / segments / wt) * j,
          (p5.width / segments / wt) * (j + 1),
          (p5.width / segments / wt) * (j + 2),
          (p5.width / segments / wt) * (j + 3),
          t
        );
        let y = p5.curvePoint(
          p5.map(decPairs[j], 0, 255, -p5.height / ht, p5.height / ht) * amp,
          p5.map(decPairs[j + 1], 0, 255, -p5.height / ht, p5.height / ht) *
            amp,
          p5.map(decPairs[j + 2], 0, 255, -p5.height / ht, p5.height / ht) *
            amp,
          p5.map(decPairs[j + 3], 0, 255, -p5.height / ht, p5.height / ht) *
            amp,
          t
        );
        let hue = reverse
          ? 255 - ((color / p5.spread + startColor + index) % 255)
          : (color / p5.spread + startColor + index) % 255;

        if (fuzzy) {
          p5.noStroke();
          p5.fill(hue, 255, 255, 20);
          let fuzzX = x + p5.map(rnd(), 0, 1, 0, p5.height / 10);
          let fuzzY = y + p5.map(rnd(), 0, 1, 0, p5.height / 10);
          if (p5.dist(x, y, fuzzX, fuzzY) < p5.height / 11.5) {
            p5.circle(
              fuzzX,
              fuzzY,
              p5.map(rnd(), 0, 1, p5.height / 160, p5.height / 16)
            );
          }
        } else {
          if (slinky && pipe) {
            if (i == 0 || i == steps - 1) {
              p5.fill(0);
            } else {
              p5.noFill();
            }
            p5.stroke(0);
            p5.circle(x, y, p5.height / 7);
          }

          if (slinky) {
            if (i == 0 || i == steps - 1) {
              p5.fill(hue, 255, 255);
            } else {
              p5.noFill();
            }
            p5.stroke(hue, 255, 255);
          } else {
            p5.noStroke();
            p5.fill(hue, 255, 255);
          }

          p5.circle(x, y, bold && !slinky ? p5.height / 5 : p5.height / 13);

          if (segmented && !slinky && !bold) {
            if (i % div === 0 || i == 0 || i == steps - 1) {
              p5.noStroke();
              p5.fill(decPairs[25]);
              p5.circle(x, y, p5.height / 12);
            }
          }
        }
        color++;
      }
      seed = parseInt(tokenData.hashes[0].slice(0, 16), 16);
    }

    loops === true ? (index = index + speed) : (index = index);
  }

  function mouseClicked() {
    if (loops === false) {
      loops = true;
    } else {
      loops = false;
    }
  }

  function rnd() {
    seed ^= seed << 13;

    seed ^= seed >> 17;

    seed ^= seed << 5;

    return ((seed < 0 ? ~seed + 1 : seed) % 1000) / 1000;
  }

  return (
    <div>
      <div
        className="relative grid min-h-screen flex-row justify-center justify-items-center	
    bg-white p-6 sm:py-12"
      >
        <div className="left-0 right-0 top-0 bottom-0 self-center">
          {/* div here MUST have id='sketch-holder' in order for Sketch to render in this div */}
          <div
            id="sketch-holder"
            className="w-[600px] h-64 order-1 "
          >
            <h1 className="text-4xl text-center py-2 font-helveticaBlack font-bold">
                Rendering Chromie Squiggle #{tokenID}...
            </h1>
            <Sketch
              setup={async function (p5, parent) {
                const createLoop = (await import("../createLoop/createLoop"))
                  .default;

                var canvas = p5.createCanvas(600, 400);
                canvas.parent("sketch-holder");
                var el = document.getElementsByTagName("canvas")[0];
                el.addEventListener("touchstart", mouseClicked, false);
                p5.colorMode(p5.HSB, 255);
                segments = p5.map(decPairs[26], 0, 255, 12, 20);
                ht = p5.map(decPairs[27], 0, 255, 3, 4);
                p5.spread =
                  decPairs[28] < 3 ? 0.5 : p5.map(decPairs[28], 0, 255, 5, 50);
                p5.strokeWeight(p5.height / 1200);

                // CreateLoop here

                let createdLoop = createLoop({ duration: 5, gif: true });
                createdLoop.start();
              }}
              draw={draw}
            />
          </div>
        </div>
        <div className="flex flex-col justify-start items-center">
        <div className="text-2xl mb-8 pt-4 font-helveticaRoman">
            Sit tight, download will start shortly. 
        </div>
        <NewSquigButton />
        </div>
      </div>
    </div>
  );
};

export default Token;
