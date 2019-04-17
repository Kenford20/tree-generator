window.onload = () => {
    const treeData = [
      {"CODEID":"8456","CODEParentID":null,"CODEVal":"8456","CODETxt":"(Root)","CODEIcon":"folder"},
      {"CODEID":"8457","CODEParentID":"8456","CODEVal":"8457","CODETxt":"2016","CODEIcon":"file"},
      {"CODEID":"20627","CODEParentID":"8456","CODEVal":"20627","CODETxt":"2017","CODEIcon":"folder"},
      {"CODEID":"21124","CODEParentID":"20627","CODEVal":"21124","CODETxt":"03 March","CODEIcon":"file"},
      {"CODEID":"21168","CODEParentID":"20627","CODEVal":"21168","CODETxt":"04 April","CODEIcon":"file"},
      {"CODEID":"21527","CODEParentID":"20627","CODEVal":"21527","CODETxt":"06 June","CODEIcon":"folder"},
      {"CODEID":"22304","CODEParentID":"20627","CODEVal":"22304","CODETxt":"10 October","CODEIcon":"folder"},
      {"CODEID":"23567","CODEParentID":"22304","CODEVal":"23567","CODETxt":"Friday","CODEIcon":"file"},
      {"CODEID":"24678","CODEParentID":"21527","CODEVal":"24678","CODETxt":"Thursday","CODEIcon":"file"}
    ];
    
    const hasChildren = (treeData, currElement) => {
      let children = treeData.filter(treeElement => treeElement.CODEParentID === currElement.CODEID);
      return children.length > 0 ? true : false;
    }
    
    const toggleFolderView = (folderNode) => {
      if(folderNode.classList.contains('hide')) {
        folderNode.classList.remove('hide', 'collapsed');
        folderNode.classList.add('expanded');
      } else {
        folderNode.classList.add('hide', 'collapsed');
        folderNode.classList.remove('expanded');
      }
    }
    
    const appendIcon = (textNode, iconKey) => {
      let icon = document.createElement(iconKey === 'folder' ? 'img' : 'i');

      if(iconKey === 'folder') {
        icon.setAttribute('src', `images/icon_${iconKey}.png`);
      } else {
        icon.setAttribute('class', 'fa fa-file');
      }
      textNode.parentNode.insertBefore(icon, textNode);
    }
    
    const createTree = (treeData) => {  
      let treeContainer = document.querySelector('#tree-container');
      let root = treeData.filter(treeElement => !treeElement.CODEParentID)[0];
      
      let rootNode = document.createElement('div');
      rootNode.setAttribute("id", root.CODEID);
      rootNode.setAttribute("class", 'tree-root folder-node expanded');
      
      let rootText = document.createElement('span');
      rootText.appendChild(document.createTextNode(root.CODETxt))
      rootNode.appendChild(rootText);
      rootText.addEventListener('click', () => toggleFolderView(rootNode));
      appendIcon(rootText, root.CODEIcon);
      treeContainer.appendChild(rootNode);
      
      treeData.map((treeElement, i) => {
        if(i !== 0) {
          let currNode = document.createElement('div');
          let textNode = document.createElement('span');
          textNode.appendChild(document.createTextNode(treeElement.CODETxt))
          currNode.appendChild(textNode);
          currNode.setAttribute("id", treeElement.CODEID);
          appendIcon(textNode, treeElement.CODEIcon);
          
          let parentNode = document.getElementById(treeElement.CODEParentID);
          parentNode.appendChild(currNode);
          
          if(hasChildren(treeData, treeElement)) {
            currNode.setAttribute('class', 'folder-node expanded');
            textNode.addEventListener('click', () => toggleFolderView(currNode));
          } 
          else {
            currNode.setAttribute('class', 'file-node');
            textNode.addEventListener('click', () => alert(treeElement.CODEVal));
          }
        }
      });
    };
  
     document.querySelector('#btn').addEventListener('click', () => {
       createTree(treeData);
       document.querySelector('#btn').style.display = 'none';
     });
  }
  