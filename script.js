document.addEventListener('DOMContentLoaded', function() { 
    const welcomeText = document.getElementById('welcomeText');
    const welcomeOverlay = document.getElementById('welcomeOverlay');
    setTimeout(function() {welcomeText.style.opacity = 0;}, 1000);
    setTimeout(function() {welcomeOverlay.style.opacity = 0;}, 1000);
});

const modalController = ({modal, btnOpen, btnClose, time = 300}) => {
  const buttonElems = document.querySelectorAll(btnOpen);
  const modalElem = document.querySelector(modal);

  modalElem.style.cssText = `
    display: flex;
    visibility: hidden;
    opacity: 0;
    transition: opacity ${time}ms ease-in-out;
  `;

  const closeModal = event => {
    const target = event.target;

    if (
      target === modalElem ||
      (btnClose && target.closest(btnClose)) ||
      event.code === 'Escape'
      ) {
      
      modalElem.style.opacity = 0;

      setTimeout(() => {
        modalElem.style.visibility = 'hidden';
      }, time);

      window.removeEventListener('keydown', closeModal);
    }
  }

  const openModal = () => {
    modalElem.style.visibility = 'visible';
    modalElem.style.opacity = 1;
    window.addEventListener('keydown', closeModal)
  };

  buttonElems.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  modalElem.addEventListener('click', closeModal);
};

modalController({
  modal: '.modal1',
  btnOpen: '.section__button1',
  btnClose: '.modal__close',
});

modalController({
  modal: '.modal2',
  btnOpen: '.section__button2',
  btnClose: '.modal__close'
});

modalController({
  modal: '.modal3',
  btnOpen: '.section__button3',
  btnClose: '.modal__close'
});

window.onload = function() {

  function Petritable(w, h)
  {
      this.width = w;
      this.height = h;
      this.htmlPetriTable;
      this.cellArray = new Array();
      this.getWidth = getWidth;
      this.getHeight = getHeight;
      this.getCell = getCell;
      this.buildCellObject = buildCellObject;
      this.assignCellToArray = assignCellToArray;
      this.buildPetriTable = buildPetriTable;
      this.deletePetritable = deletePetritable;
      this.syncDrawingStatusToLife = syncDrawingStatusToLife;
      this.syncLifeStatusToDrawing = syncLifeStatusToDrawing;

      function getWidth() {
          return this.width;
      }

      function getHeight() {
          return this.height;
      }

      function getCell(width, height) {
          return this.cellArray[ width + "_" + height ];
      }

      function buildCellObject(cellHTMLElement, width, height) {
          var newCell = new Cell(cellHTMLElement);
          newCell.setID(width, height);
          newCell.setAttribute("id", width + "_" + height);
          newCell.setAttribute("class", "deadcell");
          newCell.addEventListener("click",function myfunc() {
              if (this.getAttribute("class") == "deadcell") {
                  this.setAttribute("class", "alivecell");
              }
              else {
                  this.setAttribute("class", "deadcell");
              }
          });
          return newCell;
      }

      function assignCellToArray(cell, width, height) {
          this.cellArray[ width + "_" + height ] = cell;
      }

      function buildPetriTable() {
          this.htmlPetriTable = document.createElement("table");
          this.htmlPetriTable.setAttribute("class","petritable");
          this.htmlPetriTable.setAttribute("id", "petritable");

          for (var i = 0; i < this.width ; i++) {
              var rowHTMLElement = this.htmlPetriTable.insertRow(i);
              for (var j = 0; j < this.height ; j++) {
                  var cellHTMLElement = rowHTMLElement.insertCell(j);
                  var newCell = buildCellObject(cellHTMLElement, i, j);
                  this.assignCellToArray(newCell, i, j);
              }
          }

          document.body.appendChild(this.htmlPetriTable);
      }

      function deletePetritable() {
          document.getElementById("petritable").remove();
      }

      function syncDrawingStatusToLife() {
          for (var i = 0; i < this.width ; i++) {
              for (var j = 0; j < this.height ; j++) {
                  var currentCell = this.getCell(i, j);
                  if (currentCell.isAlive()) {
                      currentCell.setAttribute("class", "alivecell");
                  } else {
                      currentCell.setAttribute("class", "deadcell");
                  }
              }
          }
      }

      function syncLifeStatusToDrawing() {
          for (var i = 0; i < this.width ; i++) {
              for (var j = 0; j < this.height ; j++) {
                  var currentCell = this.getCell(i, j);
                  if (currentCell.getAttribute("class") == "alivecell") {
                      currentCell.setAlive(true);
                  } else {
                      currentCell.setAlive(false);
                  }
              }
          } 
      }

      this.buildPetriTable();
  }

  function Cell(c)
  {
      this.element = c;
      this.row;
      this.column;
      this.alive = false;
      this.generation = 0;
      this.setID = setID;
      this.setAttribute = setAttribute;
      this.getAttribute = getAttribute;
      this.addEventListener = addEventListener;
      this.setAlive = setAlive;
      this.isAlive = isAlive;
      this.getNumberOfNeighbours = getNumberOfNeighbours;
      this.getNeighborCoords = getNeighborCoords;
      this.isNeighbourAlive = isNeighbourAlive;

      function setAttribute(attribute, value) {
          this.element.setAttribute(attribute, value);
      }

      function getAttribute(attribute) {
          return this.element.getAttribute(attribute);
      }

      function addEventListener(action, func) {
          this.element.addEventListener(action ,func);
      }

      function setID(row, col) {
          this.row = row;
          this.column = col;
      }

      function setAlive(isAlive) {
          this.alive = isAlive;
      }

      function isAlive() {
          return this.alive;
      }

      function getNumberOfNeighbours(table) {
          var num = 0;
          var neighborCoords = this.getNeighborCoords();
          for (var i = 0; i < neighborCoords.length; i += 2) {
              if (this.isNeighbourAlive(i, neighborCoords, table)) {
                  num++;
              }
          }
          return num;
      }

      function getNeighborCoords() {
          var neighborCoords = new Array();
          neighborCoords[0] = this.row - 1;
          neighborCoords[1] = this.column;
          neighborCoords[2] = this.row + 1;
          neighborCoords[3] = this.column;
          neighborCoords[4] = this.row;
          neighborCoords[5] = this.column - 1;
          neighborCoords[6] = this.row;
          neighborCoords[7] = this.column + 1;
          neighborCoords[8] = this.row - 1;
          neighborCoords[9] = this.column - 1;
          neighborCoords[10] = this.row - 1;
          neighborCoords[11] = this.column + 1;
          neighborCoords[12] = this.row + 1;
          neighborCoords[13] = this.column - 1;
          neighborCoords[14] = this.row + 1;
          neighborCoords[15] = this.column + 1;
          return neighborCoords;
      }

      function isNeighbourAlive(index, coords, table) {
          var dir_r = coords[ index ];
          var dir_c = coords[ index + 1 ];

          if (dir_r < 0 || dir_c < 0 ||
              dir_r > table.getWidth() - 1 ||
              dir_c > table.getHeight() - 1) {
              return false;
          }

          if(table.getCell(dir_r, dir_c).getAttribute("class") == "alivecell") {
              return true;
          }

          return false;
      }
  }

  function LifeGen(w, h) 
  {
      this.width = w;
      this.height = h;
      this.theTable = new Petritable(w,h);
      this.lifeAndDeath = lifeAndDeath;

      function lifeAndDeath() {
        var isStable = checkStability();
    
        if (!isStable) {
            generator.theTable.syncDrawingStatusToLife();
    
            for (var i = 0; i < this.width; i++) {
                for (var j = 0; j < this.height; j++) {
                    var currentCell = generator.theTable.getCell(i, j);
                    var nOn = currentCell.getNumberOfNeighbours(generator.theTable);
                    if (currentCell.isAlive()) {
                        if (nOn < 2) {
                            currentCell.setAlive(false);
                        } else if (nOn == 2 || nOn == 3) {
                            currentCell.generation++;
                        } else {
                            currentCell.setAlive(false);
                        }
                    } else {
                        if (nOn == 3) {
                            currentCell.setAlive(true);
                        }
                    }
                }
            }
    
            if (checkStability()) {
                clearInterval(intervalId);
            }
        }
    }
  }

  var petritableWidth = 10;
  var petritableHeight = 20;
  var generator = new LifeGen(petritableWidth,petritableHeight);

  var intervalId;

  var pauseBtnListener = function() {
    clearInterval(intervalId);
}

function checkStability() {
  
}

var resumeBtnListener = function() {
  generator.theTable.syncLifeStatusToDrawing();
  intervalId = setInterval(function() { generator.lifeAndDeath(); }, 50);
}

var endBtnListener = function() {
    clearInterval(intervalId);
    generator.theTable.deletePetritable();
    document.getElementById("startBtn").removeAttribute("disabled");
    generator = new LifeGen(petritableWidth, petritableHeight);
}

var clearBtnListener = function() {
  generator.theTable.deletePetritable();
  clearInterval(intervalId);
  document.getElementById("startBtn").removeAttribute("disabled");
  generator = new LifeGen(petritableWidth,petritableHeight);
}

var startBtnListener = function() {
  generator.theTable.syncLifeStatusToDrawing();
  intervalId = setInterval(function() { generator.lifeAndDeath(); }, 50);
  this.setAttribute("disabled", true);
}

document.getElementById("pauseBtn").addEventListener("click", pauseBtnListener, false);
document.getElementById("resumeBtn").addEventListener("click", resumeBtnListener, false);
document.getElementById("endBtn").addEventListener("click", endBtnListener, false);
document.getElementById("resetBtn").addEventListener("click", clearBtnListener, false);
document.getElementById("startBtn").addEventListener("click", startBtnListener, false);
}
