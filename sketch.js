let startPage;
let howDayPage;
let drawYourselfPage;
let howFeelPage;
let endPage;
let screen;
let board;
let rectCorners = 12;
let selectedPage = 0;
let PINK_COLOR = '#FF66C4';
let BOARD_WIDTH;
let BOARD_HEIGHT;

function setup() {
    screen = createGraphics(windowWidth, windowHeight);
    board = createGraphics(windowWidth - 100, windowHeight - 270);
    BOARD_WIDTH = windowWidth-100;
    BOARD_HEIGHT = windowHeight-270;
    rectMode(CENTER);
    createCanvas(windowWidth, windowHeight);
    background(PINK_COLOR);

    //// create pages
    startPage = new StartPage(onNextPage);
    endPage = new EndPage(onNextPage);
    initPagesDraw();
}
function initPagesDraw(){
    howDayPage = new HowDayPage(onNextPage);
    drawYourselfPage = new DrawYourselfPage(onNextPage);
    howFeelPage = new HowFeelPage(onNextPage);
}

function draw() {
    //text(mouseX + " - " + mouseY, 350, 15);
    switch (selectedPage) {
        case 0:
            startPage.draw();
            break;
        case 1:
            howDayPage.draw();
            break;
        case 2:
            drawYourselfPage.draw();
            break;
        case 3:
            howFeelPage.draw();
            break;
        case 4:
            endPage.draw();
            initPagesDraw();
            break;
    }
}

function mousePressed() {
    switch (selectedPage) {
        case 0:
            startPage.mousePressed();
            break;
        case 1:
            howDayPage.mousePressed();
            break;
        case 2:
            drawYourselfPage.mousePressed();
            break;
        case 3:
            howFeelPage.mousePressed();
            break;
        case 4:
            endPage.mousePressed();
            break;
    }
}

function mouseDragged() {
    switch (selectedPage) {
        case 0:
            startPage.mouseDragged();
            break;
        case 1:
            howDayPage.mouseDragged();
            break;
        case 2:
            drawYourselfPage.mouseDragged();
            break;
        case 3:
            howFeelPage.mouseDragged();
            break;
        case 4:
            endPage.mouseDragged();
            break;
    }
}

function mouseClicked() {
    switch (selectedPage) {
        case 0:
            startPage.mouseClicked();
            break;
        case 1:
            howDayPage.mouseClicked();
            break;
        case 2:
            drawYourselfPage.mouseClicked();
            break;
        case 3:
            howFeelPage.mouseClicked();
            break;
        case 4:
            endPage.mouseClicked();
            break;
    }
}

function mouseReleased() {
    switch (selectedPage) {
        case 0:
            startPage.mouseReleased();
            break;
        case 1:
            howDayPage.mouseReleased();
            break;
        case 2:
            drawYourselfPage.mouseReleased();
            break;
        case 3:
            howFeelPage.mouseReleased();
            break;
        case 4:
            endPage.mouseReleased();
            break;
    }
}

function mouseClicked() {
    switch (selectedPage) {
        case 0:
            startPage.mouseClicked();
            break;
        case 1:
            howDayPage.mouseClicked();
            break;
        case 2:
            drawYourselfPage.mouseClicked();
            break;
        case 3:
            howFeelPage.mouseClicked();
            break;
        case 4:
            endPage.mouseClicked();
            break;
    }
}

function onNextPage() {
    selectedPage++;
    if (selectedPage > 4) {
        selectedPage = 0;
    }
}
