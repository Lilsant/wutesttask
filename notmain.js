const catalog = document.querySelector(".catalog__main");
const itemsCount = document.querySelector("#items-count");
const searchInput = document.querySelector(".catalog__search-input");
const prevButton = document.querySelector("#back");
const nextButton = document.querySelector("#next");
const rootButton = document.querySelector("#root");
const catalogAdressInput = document.querySelector(".catalog__adress-input");

let data = {
  folders: [
    {
      name: "Govno",
      files: [{ name: "Haha", id: 4293 }],
      id: 0,
      folders: [],
    },
    {
      name: "Shashlick",
      files: [],
      id: 1,
      folders: [
        {
          name: "Govnishko",
          files: [],
          id: 24,
          folders: [],
        },
        {
          name: "Halapenyu",
          files: [{ name: "Objs", id: 421421 }],
          id: 22,
          folders: [],
        },
      ],
    },
  ],
  files: [
    {
      name: "JOJO",
      id: 42,
    },
    {
      name: "BBQ",
      id: 4332,
    },
    {
      name: "Shas",
      id: 533,
    },
  ],
};

let currentPath = "./";
let historyNextPath = "./";


function repairAdress(changes = 0, type = 0) {
  catalogAdressInput.value = currentPath;
  let currentFolder = changeData(changes, type);
  displayCatalogElements(currentFolder.folders, currentFolder.files);
}



function disablePanel() {
  document.querySelector(".panel").remove();
}

function constructPanel(name, rename = false) {
  let element = document.createElement("span");
  if(rename) element.textContent = `Rename ${name}`;
  else element.textContent = `Create ${name}`;
  element.classList.add("panel__item");
  element.addEventListener("click", () => {
    const newFolder = document.createElement("div");
    newFolder.classList.add("catalog__element");
    newFolder.classList.add(`${name}`);
    newFolder.innerHTML = `<img class='catalog__element-icon' src='./img/${name}.png'/>
        <input class="catalog__element-name-input" type="text"/>
        `;
        catalog.append(newFolder);
    document
      .querySelector(`.catalog__element-name-input`)
      .addEventListener("blur", (e) => {
        if (name === "file") {
          repairAdress({ name: e.target.value, id: 53 }, name);
        } else if (name === "folder") {
          repairAdress(
            { name: e.target.value, files: [], folders: [], id: 103 },
            name
            );
        }
      });
    disablePanel();
  });
  return element;
}

function constructRepairPanel(name, rename = false) {


}

window.oncontextmenu = function (event) {
  console.log(event);
  let panel = document.createElement("div");
  panel.classList.add("panel");
  panel.style.position = "absolute";
  panel.style.left = `${event.x}px`;
  panel.style.top = `${event.y}px`;
  console.log(event.target);
  if(event.target.className === "catalog__element-name" || event.target.className === "catalog__element-image") {
    let renameTab = constructPanel("folder", true);
      panel.append(renameTab);
  }
  else {
    let fileTab = constructPanel("file");
  let folderTab = constructPanel("folder");
  panel.append(fileTab);
  panel.append(folderTab);
}
  catalog.append(panel);
  return false;
};

searchInput.addEventListener("change", (e) => {
  if (e.target.value === "") displayCatalogElements(data.folders, data.files);
  else {
    let filesArr = searchElements(e.target.value, "files");
    let foldersArr = searchElements(e.target.value, "folders");
    displayCatalogElements(foldersArr, filesArr);
  }
});

if (data.folders) {
  repairAdress();
}

function displayCatalogElements(folders, files) {
  catalog.innerHTML = "";
  itemsCount.textContent = `${folders.length + files.length}`;
  folders.forEach((folder) => {
    let imgAdress;
    if (folder.folders || folder.files) {
      imgAdress = "./img/filled_folder.png";
    } else {
      imgAdress = "./img/folder.png";
    }
    let element = constructCatalogElement(folder.name, imgAdress);
    element.addEventListener("click", (e) => {
      let currentFolder = changeData();
      currentFolder.folders.forEach((el) => {
        if (el.name === e.target.parentElement.innerText) {
          currentPath += `${e.target.parentElement.innerText}/`;
          repairAdress();
        }
      });
    });
    catalog.append(element);
  });
  files.forEach((file) => {
    let imgAdress = "./img/file.png";
    let element = constructCatalogElement(file.name, imgAdress);
    catalog.append(element);
  });
}

function constructCatalogElement(title, image) {
  let element = document.createElement("div");
  element.classList.add("catalog__element");
  let name = document.createElement("span");
  name.classList.add("catalog__element-name");
  name.textContent = title;
  let img = document.createElement("img");
  img.classList.add("catalog__element-image");
  img.src = image;
  element.append(img);
  element.append(name);
  return element;
}

function searchElements(searchText, type) {
  let newArr;
  if (type == "files") newArr = [...data.files];
  if (type == "folders") newArr = [...data.folders];
  newArr = newArr.filter((el) => {
    let fileName = el.name.toLowerCase();
    let searchRequest = searchText.toLowerCase();
    return fileName.includes(searchRequest);
  });
  return newArr;
}

function changeData(changes = 0, type = 0) {
  let currentFolder = { ...data };
  let path = currentPath.split("/");
  let currentFolder2 = { ...data };
  console.log(path);
  path.forEach((el, i) => {
    if (el)
      currentFolder.folders.forEach((folder) => {
        if (folder.name === el) {
          currentFolder = folder;
          for (let antoha in currentFolder2) {
            if (currentFolder2[antoha].id === folder.id)
              currentFolder2[antoha] = folder;
            if (i === path.length - 2 && changes) {
              if (type == "folder") {
                currentFolder.folders = [...currentFolder.folders, changes];
                currentFolder2[antoha].folders = currentFolder.folders;
                break;
              }
              if (type == "file") {
                currentFolder.files = [...currentFolder.files, changes];
                currentFolder2[antoha].files = currentFolder.files;
                break;
              }
            }
          }
        }
      });
  });

  data = { ...currentFolder2 };
  console.log(currentFolder2);
  return currentFolder;
}

function deleteFromData(name){
  let find;
  let currentData = {...data};
  function rideObject(arr){
      arr.forEach((el)=>{
        if(el.name === name) {
          currentData["folders"].forEach((element,index) =>{
            if(name === element.name) find = index;
          })
          currentData["folders"].splice(find,1);
          console.log(currentData["folders"]); return}
        else {
          for(let i in currentData) {
            if(i=="folders") currentData[i] = el.folders;
          }
          rideObject(el.folders);}
      })
  }
  rideObject(data.folders);
  console.log(currentData);
}
prevButton.addEventListener("click", () => {
  if (currentPath === "./") {
    historyNextPath = "./";
    return;
  }
  historyNextPath = currentPath;
  let copyPath = currentPath.split("/");
  currentPath = "";
  console.log(copyPath);
  let i = 0;
  while (i < copyPath.length - 2) {
    currentPath += copyPath[i];
    currentPath += "/";
    i++;
  }
  repairAdress();
});

nextButton.addEventListener("click", () => {
  currentPath = historyNextPath;
  repairAdress();
});

rootButton.addEventListener("click", () => {
  currentPath = "./";
  historyNextPath = "./";
  repairAdress();
});
