let img;

// Size of target
const targetSize = 15;
// Number of rings
const targetSamples = 3;
// Adjust the size of the targets
const targetScaling = 0.9;
// larger number == closer point sampled
// smaller number == more random
const sampleRange = 4;

const spacing = targetSize * 1.5;

const gridSample = targetSize / 10;

function preload() {
  // update path to use your own images
  img = loadImage("data/Lucyownes.png");
}

function setup() {
  // Canvas is 10 times the size of the image
  // If you want a different sized image just make the input
  // image the approprate size
  createCanvas(img.width, img.height);

  print(img.width + " • " + img.height);
}

function draw() {
  background(255);

  let yCount = 0;
  for (let gridY = 0; gridY < img.height; gridY += gridSample) {
    let posY = map(gridY, 0, img.height, spacing, height - spacing);
    if (yCount % 2 == 0) {
      for (let gridX = 0; gridX < img.width; gridX += gridSample) {
        let posX = map(gridX, 0, img.width, spacing, width - spacing);

        // get current color
        // let c = color(img.get(gridX, gridY));

        // greyscale conversion
        // let greyscale = round(
        //   red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071
        // );

        // pixel color to fill, greyscale to ellipse size
        // let sizeScale = map(greyscale, 0, 255, targetSize, targetSize);
        let sizeScale = targetSize * targetScaling;
        target(gridX, gridY, posX, posY, sizeScale, targetSamples);
      }
    } else {
      for (let gridX = 0; gridX < img.width - gridSample; gridX += gridSample) {
        // Adjust x spacing for less image sampling
        let posX = map(
          gridX,
          0,
          img.width,
          spacing * 1.25,
          width - spacing / 1.25
        );

        // get current color
        // let c = color(img.get(gridX, gridY));

        // greyscale conversion
        // let greyscale = round(
        //   red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071
        // );

        // pixel color to fill, greyscale to ellipse size
        // let sizeScale = map(greyscale, 0, 255, targetSize, targetSize);
        let sizeScale = targetSize * targetScaling;

        target(gridX, gridY, posX, posY, sizeScale, targetSamples);
      }
    }

    yCount++;
  }

  noLoop();
}

function target(gridX, gridY, xPos, yPos, size, circleNum) {
  noStroke();

  for (let i = 0; i < circleNum; i++) {
    let randomSampleX = gridX + random(-size / sampleRange, size / sampleRange);
    let randomSampleY = gridY + random(-size / sampleRange, size / sampleRange);

    let samplePoint = color(img.get(randomSampleX, randomSampleY));

    // every second loop alternate the color of the ellipse

    fill(samplePoint);
    // Calculate the size of the ellipse needed in each loop
    let currentSize = size - (i * size) / circleNum;
    ellipse(xPos, yPos, currentSize);
  }
}

// function keyPressed() {
//   saveCanvas("img", "png");
// }

function mousePressed() {
  loop();
}

// let img;
//
//  // let targets = [];
//
//  let targetSize = 9;
//  let spacing = targetSize * 2;
//
//  function preload() {
//    img = loadImage("data/pic.png");
//  }
//
//  function setup() {
//    // Canvas is 10 times the size of the image
//    createCanvas(img.width * 10, img.height * 10);
//    print(img.width + " • " + img.height);
//  }
//
//  function draw() {
//    background(255);
//
//    for (let gridX = 0; gridX < img.width; gridX++) {
//      for (let gridY = 0; gridY < img.height; gridY++) {
//        let posX;
//        if (gridY % 2 == 0) {
//          posX = map(gridX, 0, img.width, spacing, width - spacing);
//        } else {
//          posX = map(gridX, 0, img.width, spacing / 2, width - spacing / 2);
//        }
//
//        let posY = map(gridY, 0, img.height, spacing, height - spacing);
//
//        // get current color
//        let c = color(img.get(gridX, gridY));
//
//        // greyscale conversion
//        let greyscale = round(
//          red(c) * 0.222 + green(c) * 0.707 + blue(c) * 0.071
//        );
//
//        // pixel color to fill, greyscale to ellipse size
//        let sizeScale = map(greyscale, 0, 255, targetSize, targetSize / 1.5);
//
//        target(gridX, gridY, posX, posY, sizeScale, 5, c);
//      }
//    }
//
//    noLoop();
//  }
//
//  function target(gridX, gridY, xPos, yPos, size, circleNum, myColor) {
//    noStroke();
//
//    for (let i = 0; i < circleNum; i++) {
//      let randomSampleX = gridX + random(-size / 2, size / 2);
//      let randomSampleY = gridY + random(-size / 2, size / 2);
//
//      let samplePoint = color(img.get(randomSampleX, randomSampleY));
//
//      // every second loop alternate the color of the ellipse
//
//      fill(samplePoint);
//      // Calculate the size of the ellipse needed in each loop
//      let currentSize = size - (i * size) / circleNum;
//      ellipse(xPos, yPos, currentSize);
//    }
//  }
//
//  // function keyReleased() {
//  //   if (key == "s" || key == "S") saveCanvas(gd.timestamp(), "png");
//  // }