import React, { useState } from "react"
import { EditorState, convertToRaw } from "draft-js"
import draftToHtml from "draftjs-to-html"
import DOMPurify from "dompurify"
//PLUGINS
import Editor from "@draft-js-plugins/editor"
import createEmojiPlugin from "@draft-js-plugins/emoji"
import createToolbarPlugin from "@draft-js-plugins/static-toolbar"
//STYLING
import "../../node_modules/@draft-js-plugins/emoji/lib/plugin.css"
import "../../node_modules/@draft-js-plugins/static-toolbar/lib/plugin.css"
import axios from "axios"

const toolbarPlugin = createToolbarPlugin()
const emojiPlugin = createEmojiPlugin()

const { Toolbar } = toolbarPlugin
const { EmojiSuggestions, EmojiSelect } = emojiPlugin

const plugins = [toolbarPlugin, emojiPlugin]

export default function MyEditor() {
	const [editorState, setEditorState] = useState(() => EditorState.createEmpty())
	const [convertedContent, setConvertedContent] = useState("")

	const handleSend = async () => {
		console.log(convertedContent)

		const { data } = await axios.post("/message/test", String(convertedContent), {
			headers: {
				"Content-Type": "application/json",
			},
		})

		console.log(data)
	}
	const onEditorStateChange = (editor) => {
		const editorHTML = draftToHtml(convertToRaw(editor.getCurrentContent()), null, false)
		// console.log(editorHTML)
		// console.log(convertToRaw(editor.getCurrentContent()))
		setEditorState(editor)
		setConvertedContent(editorHTML)
	}
	const createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html),
		}
	}

	return (
		<div className='editor--wrapper'>
			<Editor editorState={editorState} onChange={onEditorStateChange} plugins={plugins} />
			<EmojiSuggestions />
			<EmojiSelect />
			<Toolbar />
			<div className='preview' dangerouslySetInnerHTML={createMarkup(convertedContent)} />
			<div className='btn-section'>
				<button onClick={handleSend} className='send-btn'>
					Send
				</button>
			</div>
		</div>
	)
}
