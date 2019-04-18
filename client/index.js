$(document).ready(() => {
    const treeData = [
        {"CODEID":"21168","CODEParentID":"20627","CODEVal":"21168","CODETxt":"04 April","CODEIcon":"file"},
        {"CODEID":"21124","CODEParentID":"20627","CODEVal":"21124","CODETxt":"03 March","CODEIcon":"file"},
        {"CODEID":"24678","CODEParentID":"21527","CODEVal":"24678","CODETxt":"Thursday","CODEIcon":"file"},
        {"CODEID":"8456","CODEParentID":null,"CODEVal":"8456","CODETxt":"(Root)","CODEIcon":"folder"}, 
        {"CODEID":"21527","CODEParentID":"20627","CODEVal":"21527","CODETxt":"06 June","CODEIcon":"folder"},
        {"CODEID":"8457","CODEParentID":"8456","CODEVal":"8457","CODETxt":"2016","CODEIcon":"file"},
        {"CODEID":"20627","CODEParentID":"8456","CODEVal":"20627","CODETxt":"2017","CODEIcon":"folder"},
        {"CODEID":"22304","CODEParentID":"20627","CODEVal":"22304","CODETxt":"10 October","CODEIcon":"folder"},
        {"CODEID":"23567","CODEParentID":"22304","CODEVal":"23567","CODETxt":"Friday","CODEIcon":"file"},
    ];
    
    const hasChildren = (treeData, currElement) => {
    //   let children = treeData.filter(treeElement => treeElement.CODEParentID === currElement.CODEID);
    //   return children.length > 0 ? true : false;
      return treeData.findIndex(treeElement => treeElement.CODEParentID === currElement.CODEID) >= 0;
    }
    
    const toggleFolderView = (folderNode) => {
      if($(folderNode).hasClass('hide')) {
        $(folderNode).removeClass('hide collapsed');
        $(folderNode).addClass('expanded');
      } else {
        $(folderNode).addClass('hide collapsed');
        $(folderNode).removeClass('expanded');
      }
    }
    
    const appendIcon = (textNode, iconKey) => {
      let icon = iconKey === 'folder' 
        ? $(`<img src="images/icon_${iconKey}.png"/>`) 
        : $(`<i class="fa fa-file"></i>`);

      $(textNode).prepend(icon);
    }
    
    const appendChildren = (treeData, parents) => {
        let parentNodes = [];

        parents.map(parent => {
            let children = treeData.filter(treeElement => treeElement.CODEParentID === parent.CODEID);

            children.map(child => {
                let textNode = $(`<span>${child.CODETxt}</span>`);
                let currNode = $(`<div id=${child.CODEID}></div>`).append(textNode);

                if(hasChildren(treeData, child)) {
                    currNode.addClass('folder-node expanded');
                    textNode.on('click', () => toggleFolderView(currNode));
                    parentNodes.push(child)
                } else {
                    currNode.addClass('file-node');
                    textNode.on('click', () => alert(child.CODEVal));
                }

                appendIcon(textNode, child.CODEIcon);
                $(`#${child.CODEParentID}`).append(currNode);
            });
        });

        if(parentNodes.length > 0) {
            return appendChildren(treeData, parentNodes);
        }
    }

    const createTree = (treeData) => {  
      let root = treeData.filter(treeElement => !treeElement.CODEParentID)[0];
      let rootNode = $(`<div id="${root.CODEID}" class="tree-root folder-node expanded"></div>`);
      let rootText = $(`
        <span>
          <img src="images/icon_${root.CODEIcon}.png"/>
          ${root.CODETxt}
        </span>
      `).on('click', () => toggleFolderView(rootNode));
      
      $(rootNode).append(rootText);
      $('body').append(rootNode);

      appendChildren(treeData, [root]);


      
    //   treeData.map((treeElement, i) => {
    //     if(i !== 0) {
    //       let textNode = $(`<span>${treeElement.CODETxt}</span>`);
    //       let currNode = $(`<div id=${treeElement.CODEID}></div>`).append(textNode);

    //       if(hasChildren(treeData, treeElement)) {
    //         currNode.addClass('folder-node expanded');
    //         textNode.on('click', () => toggleFolderView(currNode));
    //       } else {
    //         currNode.addClass('file-node');
    //         textNode.on('click', () => alert(treeElement.CODEVal));
    //       }
    //       appendIcon(textNode, treeElement.CODEIcon);
    //       $(`#${treeElement.CODEParentID}`).append(currNode);
    //     }
    //   });
    };
  
    $('#btn').on('click', () => {
      createTree(treeData);
      $('#btn').css('display', 'none');
    });
});
  