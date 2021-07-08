import { dispatch, handleEvent } from './codeMessageHandler';
figma.showUI(__html__);
figma.ui.resize(300,160);

handleEvent('notify', (state) => {
	if(state.time) {
		figma.notify(state.message, {timeout: state.time} )
	} else {
		figma.notify(state.message)
	}
	
})

handleEvent('selectNode', () => {
	// console.log(state.fontFamily)
	figma.on('selectionchange', () => {
		if(figma.currentPage.selection.length > 0) {
			const selection = figma.currentPage.selection;
			if(selection[0].constructor.name == "FrameNode") {
				const result = selection[0].id.replace(":", "%3A");
				// console.log(selection[0].constructor.name);
				dispatch('returnId', result);
			} else {
				dispatch('returnId', false);
			}
		} else {
			dispatch('returnId', false);
		}
	})
})

handleEvent('storageLink', (state) =>  {
	async function setSync() {
		const result = await figma.clientStorage.setAsync("url", state.linkSaving);
		// console.log(result);

		async function getSync() {
			const resultSave = await figma.clientStorage.getAsync("url");
			console.log(resultSave);
			dispatch('getLinkReturn', resultSave);
		}
		getSync();
	}
	setSync();
})

handleEvent('resetLink', () => {
	async function resetSync() {
		const result = await figma.clientStorage.setAsync("url", undefined);
		console.log(result);
		dispatch('getLinkReturn', result);
	}
	resetSync();
})

handleEvent('getLink', () =>  {
	async function getSync() {
		const result = await figma.clientStorage.getAsync("url");
		console.log(result);
		dispatch('getLinkReturn', result);
	}
	getSync();
})