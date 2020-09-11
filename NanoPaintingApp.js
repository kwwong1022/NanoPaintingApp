const orig = 0;  //origin of canvas
const fr = 60;   //frame rate

var inDebugMode = false;
var showCanvasGrid = false;

function setup() {
  canvas = createCanvas(400, 400);
  
  //setup frame rate for animation
  frameRate(fr);
  
  //fountain pen tool path
  canvas.mousePressed(startPath);
}

function draw() {
  var frameCountSecond = frameCount/fr | 0;

  //show canvas grid if showCanvasGrid == true
  canvasGrid();

  //welcome screen with application name
  splashScreen(frameCountSecond);

  //main application
  drawApplication();

  //show dedug dialog if showCanvasGrid == true
  debug();
}

//------------------------------------- Main Function -----------------------------------------//

var tbPage = 0;  //tool bar page: 0:brush, 1:colour, 2:brushShape
//setting the position of the seek bar button
var baPosition = 204;
var bsPosition = 230;
var rPosition = 120;
var gPosition = 195;
var bPosition = 270;
//different brush shape
var brushMode = 1;
//arrays of drawing path
var drawing = [];
var currentPath = [];
var toolbarIn = 0;

function drawApplication() {
  //if splash screen animation ended
  if (phase == 5) {
    //enable draw function when the mouse is pressed
    drawFunc();

    //create the layout of the draw application
    drawLayout();
  }
}

function drawLayout() {
  //draw title bar
  fill(237, 142, 142);
  stroke(237, 142, 142);
  strokeWeight(0);
  rect(orig, orig, width, 26);
  //title bar text
  fill(255);
  stroke(255);
  strokeWeight(0);
  textSize(13);
  textStyle(NORMAL);
  text("NANO Painting Application", 12, 17.5);

  //draw tool bar
  toolBar();
}

function toolBar() {
  //tool bar background
  fill(207);
  stroke(237, 142, 142);
  strokeWeight(0);
  rect(orig, 80, 38, 267, 0, 10, 10, 0);
  //tool bar page background
  fill(177);
  stroke(237, 142, 142);
  strokeWeight(0);
  rect(6, 87, 25, 25, 8, 8);

  //------------------------------ tool bar page1 - brush setting -----------------------------//

  if (tbPage == 0) {
    //switch page function
    fill(235);
    stroke(255);
    strokeWeight(0);
    textSize(16);
    textStyle(BOLD);
    text(tbPage+1, 14.5, 105);
    if (mouseX>=8 && mouseX<=30 && mouseY>=88 && mouseY<=113 && mouseIsPressed) {
      //tool bar page background
      fill(157);
      stroke(237, 142, 142);
      strokeWeight(0);
      rect(6, 87, 25, 25, 8, 8);
      //tool bar page text
      fill(215);
      stroke(255);
      strokeWeight(0);
      textSize(16);
      textStyle(BOLD);
      text(tbPage+1, 14.5, 105);
    }

    //adjust brush alpha function
    fill(177);
    stroke(255);
    strokeWeight(0);
    rect(6, 120, 25, 102, 8, 8);
    //seek bar button
    fill(235);
    stroke(255);
    strokeWeight(0);
    rect(6, baPosition, 25, 18, 8, 8);
    if (mouseX>=8 && mouseX<=30 && mouseY>=120 && mouseY<=220 && mouseIsPressed) {
      baPosition = mouseY-9;
      if (baPosition < 120) {
        baPosition = 120;
      } else if (baPosition > 204) {
        baPosition = 204;
      }
    }

    //adjust brush size function
    fill(177);
    stroke(255);
    strokeWeight(0);
    rect(6, 230, 25, 102, 8, 8);
    //seek bar button
    fill(235);
    stroke(255);
    strokeWeight(0);
    rect(6, bsPosition, 25, 18, 8, 8);
    if (mouseX>=8 && mouseX<=30 && mouseY>=220 && mouseY<=333 && mouseIsPressed) {
      bsPosition = mouseY-9;
      if (bsPosition < 230) {
        bsPosition = 230;
      } else if (bsPosition > 315) {
        bsPosition = 315;
      }
    }

  //------------------------------ tool bar page2 - color setting -----------------------------//

  } else if (tbPage == 1) {
    //switch page function
    fill(235);
    stroke(255);
    strokeWeight(0);
    textSize(16);
    textStyle(BOLD);
    text(tbPage+1, 14.5, 105);
    if (mouseX>=8 && mouseX<=30 && mouseY>=88 && mouseY<=113 && mouseIsPressed) {
      //tool bar page background
      fill(157);
      stroke(237, 142, 142);
      strokeWeight(0);
      rect(6, 87, 25, 25, 8, 8);
      //tool bar page text
      fill(215);
      stroke(255);
      strokeWeight(0);
      textSize(16);
      textStyle(BOLD);
      text(tbPage+1, 14.5, 105);
    }

    //red
    fill(177);
    stroke(255);
    strokeWeight(0);
    rect(6, 120, 25, 65, 8, 8);
    //seek bar button
    fill(235);
    stroke(255);
    strokeWeight(0);
    rect(6, rPosition, 25, 18, 8, 8);
    if (mouseX>=8 && mouseX<=30 && mouseY>=120 && mouseY<=186 && mouseIsPressed) {
      rPosition = mouseY-9;
      if (rPosition < 120) {
        rPosition = 120;
      } else if (rPosition > 168) {
        rPosition = 168;
      }
    }

    //green
    fill(177);
    stroke(255);
    strokeWeight(0);
    rect(6, 195, 25, 65, 8, 8);
    //seek bar button
    fill(235);
    stroke(255);
    strokeWeight(0);
    rect(6, gPosition, 25, 18, 8, 8);
    if (mouseX>=8 && mouseX<=30 && mouseY>=195 && mouseY<=261 && mouseIsPressed) {
      gPosition = mouseY-9;
      if (gPosition < 195) {
        gPosition = 195;
      } else if (gPosition > 243) {
        gPosition = 243;
      }
    }

    //blue
    fill(177);
    stroke(255);
    strokeWeight(0);
    rect(6, 270, 25, 65, 8, 8);
    //seek bar button
    fill(235);
    stroke(255);
    strokeWeight(0);
    rect(6, bPosition, 25, 18, 8, 8);
    if (mouseX>=8 && mouseX<=30 && mouseY>=270 && mouseY<=336 && mouseIsPressed) {
      bPosition = mouseY-9;
      if (bPosition < 270) {
        bPosition = 270;
      } else if (bPosition > 317) {
        bPosition = 317;
      }
    }

  //---------------------------------- tool bar page3 - brush ---------------------------------//

  } else if (tbPage == 2) {
    var offsetY = 5;
    //switch page function
    fill(235);
    stroke(255);
    strokeWeight(0);
    textSize(16);
    textStyle(BOLD);
    text(tbPage+1, 14.5, 105);
    if (mouseX>=8 && mouseX<=30 && mouseY>=88 && mouseY<=113 && mouseIsPressed) {
      //tool bar page background
      fill(157);
      stroke(237, 142, 142);
      strokeWeight(0);
      rect(6, 87, 25, 25, 8, 8);
      //tool bar page text
      fill(215);
      stroke(255);
      strokeWeight(0);
      textSize(16);
      textStyle(BOLD);
      text(tbPage+1, 14.5, 105);
    }

    //circle shape
    fill(177);
    stroke(237, 142, 142);
    strokeWeight(0);
    rect(6, 120 + offsetY, 25, 25, 8, 8);
    fill(215);
    circle(18.5, 137, 9);
    if (mouseX>=8 && mouseX<=30 && mouseY>=126 && mouseY<=151 && mouseIsPressed) {
      fill(157);
      stroke(237, 142, 142);
      strokeWeight(0);
      rect(6, 120 + offsetY, 25, 25, 8, 8);
      fill(215);
      circle(18.5, 137, 9);
      brushMode = 1;
    }

    //triangle shape
    fill(177);
    stroke(237, 142, 142);
    strokeWeight(0);
    rect(6, 153 + offsetY, 25, 25, 8, 8);
    fill(215);
    triangle(18.5, 165, 13.5, 175, 24.5, 175);
    if (mouseX>=8 && mouseX<=30 && mouseY>=159 && mouseY<=184 && mouseIsPressed) {
      fill(157);
      stroke(237, 142, 142);
      strokeWeight(0);
      rect(6, 153 + offsetY, 25, 25, 8, 8);
      fill(215);
      triangle(18.5, 165, 13.5, 175, 24.5, 175);
      brushMode = 2;
    }

    //rectangle shape
    fill(177);
    stroke(237, 142, 142);
    strokeWeight(0);
    rect(6, 186 + offsetY, 25, 25, 8, 8);
    fill(215);
    rect(14, 198, 10, 10);
    if (mouseX>=8 && mouseX<=30 && mouseY>=192 && mouseY<=217 && mouseIsPressed) {
      fill(157);
      stroke(237, 142, 142);
      strokeWeight(0);
      rect(6, 186 + offsetY, 25, 25, 8, 8);
      fill(215);
      rect(14, 198, 10, 10);
      brushMode = 3;
    }

    //fountain pen tool
    fill(177);
    stroke(237, 142, 142);
    strokeWeight(0);
    rect(6, 219 + offsetY, 25, 25, 8, 8);
    fill(215);
    //draw fountain pen logo
    beginShape();
    vertex(19, 230);
    vertex(13, 235);
    vertex(15, 242);
    vertex(23, 242);
    vertex(25, 235);
    endShape(CLOSE);
    fill(177);
    rect(18.2, 230, 1.5, 9);
    circle(19, 238, 5);
    if (mouseX>=8 && mouseX<=30 && mouseY>=225 && mouseY<=250 && mouseIsPressed) {
      fill(157);
      stroke(237, 142, 142);
      strokeWeight(0);
      rect(6, 219 + offsetY, 25, 25, 8, 8);
      fill(215);
      beginShape();
      vertex(19, 230);
      vertex(13, 235);
      vertex(15, 242);
      vertex(23, 242);
      vertex(25, 235);
      endShape(CLOSE);
      fill(157);
      rect(18.2, 230, 1.5, 9);
      circle(19, 238, 5);
      brushMode = 0;
    }

    //table bar
    fill(177);
    stroke(237, 142, 142);
    strokeWeight(0);
    rect(6, 257 + offsetY, 25, 1);

    //show canvas grid function
    fill(177);
    stroke(237, 142, 142);
    strokeWeight(0);
    rect(6, 270 + offsetY, 25, 25, 8, 8);
    fill(215);
    rect(14, 284, 10, 1.5);
    rect(14, 289, 10, 1.5);
    rect(16, 282, 1.5, 10);
    rect(20.5, 282, 1.5, 10);
    if (mouseX>=8 && mouseX<=30 && mouseY>=276 && mouseY<=301 && mouseIsPressed) {
      fill(157);
      stroke(237, 142, 142);
      strokeWeight(0);
      rect(6, 270 + offsetY, 25, 25, 8, 8);
      fill(215);
      rect(14, 284, 10, 1.5);
      rect(14, 289, 10, 1.5);
      rect(16, 282, 1.5, 10);
      rect(20.5, 282, 1.5, 10);
    }

    //reset canvas function
    fill(177);
    stroke(237, 142, 142);
    strokeWeight(0);
    rect(6, 303 + offsetY, 25, 25, 8, 8);
    fill(215);
    rect(17.5, 314.5, 3, 3);
    rect(14, 316.5, 10, 1.5);
    rect(15.4, 319.5, 7.3, 6.5, 0, 0, 2, 2);
    if (mouseX>=8 && mouseX<=30 && mouseY>=309 && mouseY<=334 && mouseIsPressed) {
      fill(157);
      stroke(237, 142, 142);
      strokeWeight(0);
      rect(6, 303 + offsetY, 25, 25, 8, 8);
    }

    //show current brush
    switch (brushMode) {
      //fountain pen
      case 0:
        fill(237, 142, 142);
        beginShape();
        vertex(19, 230);
        vertex(13, 235);
        vertex(15, 242);
        vertex(23, 242);
        vertex(25, 235);
        endShape(CLOSE);
        fill(177);
        rect(18.2, 230, 1.5, 9);
        circle(19, 238, 5);
        break;

      //circle brush
      case 1:
        fill(237, 142, 142);
        circle(18.5, 137, 9);
        break;

      //triangle brush
      case 2:
        fill(237, 142, 142);
        triangle(18.5, 165, 13.5, 175, 24.5, 175);
        break;

      //rectangle brush
      case 3:
        fill(237, 142, 142);
        rect(14, 198, 10, 10);
        break;
    }
    
    if (showCanvasGrid) {
        fill(237, 142, 142);
        rect(14, 284, 10, 1.5);
        rect(14, 289, 10, 1.5);
        rect(16, 282, 1.5, 10);
        rect(20.5, 282, 1.5, 10);
    }
  }
  
  //toolbar fade in animation
  if (phase == 5) {
    fill(207, toolbarIn);
    stroke(237, 142, 142, toolbarIn);
    strokeWeight(0);
    rect(orig, 80, 38, 267, 0, 10, 10, 0);
    toolbarIn -= 15;
  }
}

//return a boolean if mouse in in toolbar area
function mouseInToolbar() {
  if (mouseX>=0 && mouseX<=39 && mouseY>=80 && mouseY<=348) {
    return true;
  } else {
    return false;
  }
}

function mouseReleased() {
  //switch to next toolbar page
  if (mouseX>=8 && mouseX<=30 && mouseY>=88 && mouseY<=113) {
    tbPageReset();
  }
  
  //enable debug mode: show debug dialog
  if (mouseX>=0 && mouseX<=176 && mouseY>=0 && mouseY<=26) {
    resetCanvas();
    if (inDebugMode) {
      inDebugMode = false;
    } else {
      inDebugMode = true;
    }
  }
  
  //show canvas grid
  if (mouseX>=8 && mouseX<=30 && mouseY>=276 && mouseY<=301 && tbPage==2) {
      if (showCanvasGrid) {
        clear();
        resetCanvas();
        showCanvasGrid = false;
      } else {
        showCanvasGrid = true;
      }
    }
  
  //reset canvas
  if (mouseX>=8 && mouseX<=30 && mouseY>=309 && mouseY<=334 && tbPage==2) {
      resetCanvas();
    }
}

function tbPageReset() {
  tbPage ++;
  if (tbPage == 3) {
    tbPage = 0;
  }
}

function drawFunc() {
  //brush value
  var brushSize = bsPosition-229;
  var r = (rPosition-119)*5.4;
  var g = (gPosition-195)*5.4;
  var b = (bPosition-270)*5.4;
  var a = (baPosition-119)*4;

  //circle shape brush
  if (mouseIsPressed && !mouseInToolbar() && brushMode == 1) {
    fill(r, g, b, a);
    noStroke();
    strokeWeight(2);
    circle(mouseX, mouseY, brushSize);
    
  //triangle shape brush
  } else if (mouseIsPressed && !mouseInToolbar() && brushMode == 2) {
    fill(r, g, b, a);
    noStroke();
    strokeWeight(2);
    triangle(mouseX, mouseY-brushSize, mouseX-brushSize, mouseY+brushSize, mouseX+brushSize, mouseY+brushSize);
    
  //rectangle shape brush
  } else if (mouseIsPressed && !mouseInToolbar() && brushMode == 3) {
    fill(r, g, b, a);
    noStroke();
    strokeWeight(2);
    rect(mouseX-(brushSize/2), mouseY-(brushSize/2), brushSize, brushSize);
  }

  //fountain pen tool
  if (mouseIsPressed && !mouseInToolbar() && brushMode == 0) {
      var point = {
        x: mouseX,
        y: mouseY
      }
      currentPath.push(point);
    }
    //draw line path
    noFill();
    stroke(0);
    for (var i = 0; i < drawing.length; i++) {
      var path = drawing[i];
      stroke(0);
      strokeWeight(2);
      beginShape();
      for (var j = 0; j < path.length; j++) {
        vertex(path[j].x, path[j].y);
      }
      endShape();
    }
}

function startPath() {
  currentPath = [];
  drawing.push(currentPath);
}

function resetCanvas() {
  clear();
  background(255);
  drawing = [];
  currentPath = [];
}

//-------------------------------------- Splash Screen ----------------------------------------//

var phase = 0;   //0:slideIn, 1:titleIn, 2:titleFreeze, 3:titleOut, 4:slideOut, 5:appFuncStart
//moving path of each object
var path1 = 0;
var path2 = 0;
var path3 = 0;
var path4 = 0;
var path5 = 0;
var path6 = 0;
//checking state of each object
var pathEnded1 = false;
var pathEnded2 = false;
var pathEnded3 = false;
var pathEnded4 = false;
var pathEnded5 = false;
var pathEnded6 = false;
//variables used for counting frames
var titleIn = 0;
var titleOut = 255;
var freeze = 70;

function splashScreen(frameCountSecond) {
  //default location for each object
  var offset1 = 450;
  var offset2 = 500;
  var offset3 = 550;
  var offset4 = 500;
  var offset5 = 450;
  var offset6 = 500;

  if (phase < 5) {
    fill(255);
    rect(orig, orig, width, height);
  }
  
  if (phase == 4) {
    fill(207, toolbarIn);
    stroke(237, 142, 142);
    strokeWeight(0);
    rect(orig, 80, 38, 267, 0, 10, 10, 0);
    toolbarIn += 2;
  }

  fill(237, 142, 142);
  stroke(237, 142, 142);
  strokeWeight(0.5);
  //create slide object
  drawSlideObject(1, offset1, path1);
  drawSlideObject(2, offset2, path2);
  drawSlideObject(3, offset3, path3);
  drawSlideObject(4, offset4, path4);
  drawSlideObject(5, offset5, path5);
  drawSlideObject(6, offset6, path6);
  
  //controls the speed and movement of objects created above
  slideAnimationController(1, random(6,8), 5, offset1);
  slideAnimationController(2, random(6,8), 5, offset2);
  slideAnimationController(3, random(6,8), 5, offset3);
  slideAnimationController(4, random(6,8), 5, offset4);
  slideAnimationController(5, random(6,8), 5, offset5);
  slideAnimationController(6, random(6,8), 5, offset6);

  showTitle();
}

//assigning each object by inserting the orderNum
function drawSlideObject(orderNum, pathOffset, path) {
  var circleR = 400/12; //radius
  var circle2R = 400/6; //diameter
  
  circle(circleR + (orderNum-1) * circle2R, orig - pathOffset + path, circle2R);
  rect((orderNum-1) * circle2R, orig - pathOffset + path, circle2R, height);
  circle(circleR + (orderNum-1) * circle2R, height - pathOffset + path, circle2R);
}

//controls the speed and movement of each object
function slideAnimationController(pathNum, speedIn, speedOut, conditionNum) {
  if (phase == 0) {
    if (!pathEnded1 || !pathEnded2 || !pathEnded3 || !pathEnded4 || !pathEnded5 || !pathEnded6) {
      switch (pathNum) {
        case 1:
          path1 += speedIn;
          if (path1 > conditionNum) {
            path1 = conditionNum;
            pathEnded1 = true;
          }
          break;
        case 2:
          path2 += speedIn;
          if (path2 > conditionNum) {
            path2 = conditionNum;
            pathEnded2 = true;
          }
          break;
        case 3:
          path3 += speedIn;
          if (path3 > conditionNum) {
            path3 = conditionNum;
            pathEnded3 = true;
          }
          break;
        case 4:
          path4 += speedIn;
          if (path4 > conditionNum) {
            path4 = conditionNum;
            pathEnded4 = true;
          }
          break;
        case 5:
          path5 += speedIn;
          if (path5 > conditionNum) {
            path5 = conditionNum;
            pathEnded5 = true;
          }
          break;
        case 6:
          path6 += speedIn;
          if (path6 > conditionNum) {
            path6 = conditionNum;
            pathEnded6 = true;
          }
          break;
      }
    }
    
    if (pathEnded1 && pathEnded2 && pathEnded3 && pathEnded4 && pathEnded5 && pathEnded6) {
      console.log("phase 1 ended");
      phase += 1;
    }
  }

  if (phase == 4) {
    fill(237, 142, 142);
    stroke(237, 142, 142);
    strokeWeight(0);
    rect(orig, orig, width, 26);

    if (path1 < 40) {
      fill(255);
      stroke(255);
      strokeWeight(0);
      textSize(13);
      textStyle(NORMAL);
      text("NANO Painting Application", 12, 17.5);
    }

    textSize(12);
    if (!pathEnded1 || !pathEnded2 || !pathEnded3 || !pathEnded4 || !pathEnded5 || !pathEnded6) {
      switch (pathNum) {
        case 1:
          path1 -= speedOut;
          if (path1 < 0) {
            path1 = 0;
            pathEnded1 = true;
          }
          break;
        case 2:
          path2 -= speedOut;
          if (path2 < 0) {
            path2 = 0;
            pathEnded2 = true;
          }
          break;
        case 3:
          path3 -= speedOut;
          if (path3 < 0) {
            path3 = 0;
            pathEnded3 = true;
          }
          break;
        case 4:
          path4 -= speedOut;
          if (path4 < 0) {
            path4 = 0;
            pathEnded4 = true;
          }
          break;
        case 5:
          path5 -= speedOut;
          if (path5 < 0) {
            path5 = 0;
            pathEnded5 = true;
          }
          break;
        case 6:
          path6 -= speedOut;
          if (path6 < 0) {
            path6 = 0;
            pathEnded6 = true;
          }
          break;
      }
    }
    
    if (pathEnded1 && pathEnded2 && pathEnded3 && pathEnded4 && pathEnded5 && pathEnded6) {
      console.log("phase 5 ended");
      phase += 1;
    }
  }
}

function showTitle() {
  //keep refreshing the background
  if (phase == 1 || phase == 2 || phase == 3) {
    clear();
    fill(237, 142, 142);
    stroke(237, 142, 142);
    strokeWeight(0.5);
    rect(orig, orig, width, height);
  }

  //title fade in
  if (phase == 1) {
    fill(255, titleIn);
    stroke(255);
    strokeWeight(0);
    textSize(37.4);
    textStyle(BOLD);
    text("NANO", 145, 205);
    textSize(12);
    textStyle(NORMAL);
    text("Painting Application", 147, 220);
    titleIn += 4;
    if (titleIn >= 255) {
      titleIn = 255;
      phase += 1;
      console.log("phase 2 ended");
    }

  //title freeze
  } else if (phase == 2) {
    fill(255);
    stroke(255);
    strokeWeight(0);
    textSize(37.4);
    textStyle(BOLD);
    text("NANO", 145, 205);
    textSize(12);
    textStyle(NORMAL);
    text("Painting Application", 147, 220);
    freeze -= 1;
    if (freeze == 0) {
      phase += 1;
      console.log("phase 3 ended");
    }

  //title fade out
  } else if (phase == 3) {
    fill(255, titleOut);
    stroke(255);
    strokeWeight(0);
    textSize(37.4);
    textStyle(BOLD);
    text("NANO", 145, 205);
    textSize(12);
    textStyle(NORMAL);
    text("Painting Application", 147, 220);
    titleOut -= 4;
    if (titleOut <= 0) {
      titleOut = 0;
      phase += 1;
      pathStateReset();
      console.log("phase 4 ended");
    }
  }
}

//reset variable to default value in slideAnimationController()
function pathStateReset() {
  pathEnded1 = false;
  pathEnded2 = false;
  pathEnded3 = false;
  pathEnded4 = false;
  pathEnded5 = false;
  pathEnded6 = false;
}

//------------------------------------- Debug Function ----------------------------------------//

//for layout alignment
function canvasGrid() {
  if (showCanvasGrid) {
    //normal line grid
    for (var x = 0; x < width; x += width / 30) {
		for (var y = 0; y < height; y += height / 30) {
			stroke(221,245,255);
			strokeWeight(0.3);
			line(x, 0, x, height);
			line(0, y, width, y);
		}
	}
    //bold line grid
    for (var x2 = 0; x2 < width; x2 += width / 6) {
		for (var y2 = 0; y2 < height; y2 += height / 6) {
			stroke(141,221,255,150);
			strokeWeight(0.5);
			line(x2, 0, x2, height);
			line(0, y2, width, y2);
		}
	}
  }
}

//data for debugging
function debug() {
  //check if debug mode is selected
  if (inDebugMode) {
    var offsetX = 250;
    var offsetY = 220;

    //dialog box
    fill(255);
    stroke(255);
    strokeWeight(0.5);
    rect(offsetX + 0, offsetY + 0, 150, 185);
    fill(0);
    textSize(12);
    textStyle(NORMAL);
    //fps info
    text("Frame per second: " + fr, offsetX + 10, offsetY + 20);
    text("Frame count: " + frameCount, offsetX + 10, offsetY + 35 )

    //timer info
    var timeString = timer();
    text("Time passed: " + timeString, offsetX + 10, offsetY + 50);

    //mouse state
    text("Mouse X: " + mouseX, offsetX + 10, offsetY + 65);
    text("Mouse Y: " + mouseY, offsetX + 10, offsetY + 80);
    text("Mouse is pressed: " + mouseIsPressed, offsetX + 10, offsetY + 95);

    //canvas grid state
    text("Show canvas grid: " + showCanvasGrid, offsetX + 10, offsetY + 110);

    //state variable
    text("phase: " + phase, offsetX + 10, offsetY + 125);
    text("toolbar page: " + tbPage+1, offsetX + 10, offsetY + 140);

    //toolbar button position
    text("baPosition: " + baPosition, offsetX + 10, offsetY + 155);
    text("bsPosition: " + bsPosition, offsetX + 10, offsetY + 170);
  }
}

//return a string of run time record
function timer() {
  //pharse frame count to min and sec
  var frameCountSecond = frameCount/fr | 0;
  var mins = frameCountSecond/fr | 0;
  var seconds = frameCountSecond%fr | 0;

  //timer int to string
  var secondsString;
  if (seconds < 10) {
    secondsString = "0" + seconds;
  } else {
    secondsString = seconds;
  }
  var timeString;
  if (frameCountSecond < 60) {
    timeString = seconds;
  } else {
    timeString = mins + ":" + secondsString;
  }
  return timeString;
}