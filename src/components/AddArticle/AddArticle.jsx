import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {EditorState, convertToRaw} from "draft-js";
import {Editor} from "react-draft-wysiwyg";
import {useNavigate} from "react-router-dom";
import {asyncAddArticleAction} from "../../store/action";
import {timeRead} from "../../utils/timeRead";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import AddArticleClasses from "./AddArticle.module.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


const AddArticle = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isDisableBth, setIsDisableBth] = useState(false);
  const [newImage, setNewImage] = useState("");
  const [inputValue, setInputValue] = useState({
    title: "",
    subtitle: "",
  });
  const [editorState, setEditorState] = useState(() =>
      EditorState.createEmpty()
  );



  const handleEditorChange = (state) => {
    setEditorState(state);
  };

  const clickSubmitBth = async () => {
    const text = convertToRaw(editorState.getCurrentContent())

    const newArticle = {
      title: inputValue.title,
      time_read: `${timeRead(text.blocks)} min read`,
      tags: inputValue.subtitle.split(',').map(tag => tag.trim()),
      content: JSON.stringify(text),
    };

    const formData = new  FormData()
    formData.append('file', newImage)
    formData.append('body', JSON.stringify(newArticle))


    dispatch(asyncAddArticleAction(formData))
    // navigate("/main-page", {replace: true});
  };


  return (
      <>
        <Header/>
        <main className={AddArticleClasses[`editor__section`]}>
          <h1 className={AddArticleClasses.title}>Add Article</h1>
          <Input
              text=""
              name="title"
              placeholder="Enter a title"
              inputValue={inputValue}
              setInputValue={setInputValue}
          />
          <Input
              text=""
              name="subtitle"
              placeholder="Enter the category name..."
              inputValue={inputValue}
              setInputValue={setInputValue}
          />
          <div className={AddArticleClasses.editor}>
            <Editor
                onEditorStateChange={handleEditorChange}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                placeholder="Enter the text..."
                editorState={editorState}
            />
          </div>
          <div className={AddArticleClasses.buttons}>
            <Button
                name="Publish an article"
                variant="contained__header"
                onClick={clickSubmitBth}
                isDisable={isDisableBth}
            />
            <div className={AddArticleClasses[`upload__button`]}>
              <Button variant="upload" name="Upload image"/>
              <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  className={AddArticleClasses[`upload`]}
                  onChange={(e) => setNewImage(e.target.files[0])}
              />
            </div>
          </div>
        </main>
        <Footer/>
      </>
  );
};
export default AddArticle;
