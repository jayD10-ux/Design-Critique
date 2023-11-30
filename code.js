// Show the HTML page in "ui.html".
figma.showUI(__html__, { width: 240, height: 280 });

// Handles messages from the UI
figma.ui.onmessage = msg => {
  if (msg.type === 'critique-design') {
    const currentSelection = figma.currentPage.selection;
    let critiqueResult;

    if (currentSelection.length === 1 && currentSelection[0].type === 'FRAME') {
      critiqueResult = "This is a sample critique. Good use of whitespace, but consider improving the color contrast for better readability.";
      // Include the name of the frame in the critique result
      critiqueResult += `\n\nSelected frame: "${currentSelection[0].name}"`;
    } else {
      critiqueResult = "Please select a single frame to critique.";
    }

    figma.ui.postMessage({ type: 'critique-result', content: critiqueResult });
  }
};

// Triggered whenever the user changes the selection in Figma
figma.on('selectionchange', () => {
  const selectedNodes = figma.currentPage.selection;
  let messageContent;

  if (selectedNodes.length === 1 && selectedNodes[0].type === 'FRAME') {
    messageContent = {
      type: 'selection',
      status: `Frame selected: "${selectedNodes[0].name}". Click "Critique Design" to get feedback.`,
      frameName: selectedNodes[0].name // Send the frame name to the UI
    };
  } else if (selectedNodes.length === 0) {
    messageContent = { type: 'selection', status: 'No frame selected. Please select a frame to critique.' };
  } else {
    messageContent = { type: 'selection', status: 'Multiple items selected. Please select a single frame to critique.' };
  }

  figma.ui.postMessage(messageContent);
});
