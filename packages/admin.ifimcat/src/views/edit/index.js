import React, { useState, useRef, Fragment, useEffect } from 'react';
import {Controlled as CodeMirror} from 'react-codemirror2';
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CFormGroup,
  CLabel,
  CInput,
  CRow,
  CCardFooter,
  CSelect,
  CButton,
  CTextarea,
  CInputCheckbox,
} from '@coreui/react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import classnames from "classnames";
import notificaty from "../../components/Notificaty"
import { markdownParser } from '../../utils/tools';
import CIcon from '@coreui/icons-react';
import {
  Q_GETBLOGBYKEY,
  Q_GETCATEGORIES,
  Q_GETTAGS,
  Q_GETTOPICS,
  M_UPDATEBLOG,
  M_CREATEBLOG,
  Q_GETADMINBLOGS,
  M_UPLOAD,
} from '../../queries';

import 'codemirror/mode/markdown/markdown';
import 'codemirror/mode/javascript/javascript';

let type = null;
let initBlog = null;

const Edit = (props) => {
  const codeMirrorRef = useRef();
  const blogKey = props.location.search.split('?blogKey=')[1] || ""
  const [blog, setBlog] = useState({ topic: -1, tags: [], category: -1, body: "" });
  const [editor, setEditor] = useState({ fullScreen: false, priview: true, edit: true });
  const [file, setFile] = useState(null);
  useQuery(Q_GETBLOGBYKEY, {
    variables: {
      key: blogKey,
    },
    refetchQueries: [{ query: Q_GETADMINBLOGS }],
    onCompleted(data) {
      notificaty.destoryAll();
      if (data.getBlogByKey) {
        initBlog = data.getBlogByKey;
        setBlog({
          ...data.getBlogByKey,
          category: data.getBlogByKey.category.id,
          topic: data.getBlogByKey.topic?.id || -1,
        });
      }
    },
    onError(err) {
      notificaty.destoryAll();
      if (err[0] && err[0].message) {
        notificaty.error(err[0].message);
        return
      }
      notificaty.error('出错啦，服务器异常，请稍后再试！');
    }
  });
  const categories = useQuery(Q_GETCATEGORIES);
  const tags = useQuery(Q_GETTAGS);
  const topics = useQuery(Q_GETTOPICS);

  const [updateBlog] = useMutation(M_UPDATEBLOG, {
    variables: {
      data: {
        id: blog.id,
        title: blog.title,
        description: blog.description,
        body: type === 'draft' ? initBlog.body : blog.body,
        draft: blog.body,
        category: Number(blog.category),
        topic: Number(blog.topic),
        tags: blog.tags.map(item => Number(item.id)),
        glance: blog.glance,
        awesome: blog.awesome,
        is_show: blog.is_show,
    } },
    onCompleted(data) {
      notificaty.destoryAll();
      if (data.updateBlog) {
        notificaty.success("保存成功！");
        setBlog({
          ...data.updateBlog,
          category: data.updateBlog.category.id,
          topic: data.updateBlog.topic?.id || -1,
        });
      }
    },
    onError(err) {
      notificaty.destoryAll();
      console.log(err);
      notificaty.error('出错啦，服务器异常，请稍后再试！');
    }
  });

  const [createBlog] = useMutation(M_CREATEBLOG, {
    variables: {
      data: {
        id: blog.id,
        title: blog.title,
        description: blog.description,
        body: type === 'draft' ? initBlog.body : blog.body,
        draft: blog.body,
        category: Number(blog.category),
        topic: Number(blog.topic),
        tags: blog.tags.map(item => Number(item.id)),
        glance: blog.glance,
        awesome: blog.awesome,
        is_show: blog.is_show,
    } },
    onCompleted({createBlog}) {
      notificaty.destoryAll();
      props.history.push(`/editor?blogKey=${createBlog.key}`)
      notificaty.success("文章已发布");
    },
    onError({ graphQLErrors }) {
      notificaty.destoryAll();
      if (graphQLErrors[0] && graphQLErrors[0].message) {
        notificaty.error(graphQLErrors[0].message);
        return
      }
      notificaty.error('出错啦，服务器异常，请稍后再试！');
    }
  });

  const [uploadImages] = useMutation(M_UPLOAD, {
    variables: {
      file,
    },
    onCompleted(data) {
      notificaty.destoryAll();
      const imgContent = `![图片描述](${data.fileUpload})`;
      insertPasteContent(codeMirrorRef.current.editor, imgContent);
      notificaty.success("图片已上传成功");
    },
    onError(err) {
      notificaty.destoryAll();
      if (err[0] && err[0].message) {
        notificaty.error(err[0].message);
        return
      }
      notificaty.error('图片上传出错啦，服务器异常，请稍后再试！');
    }
  });

  const insertPasteContent = (cm, content) => {
    const { length } = cm.getSelections();
    cm.replaceSelections(Array(length).fill(content));
  };

  const changeBlogTags = e => {
    const index = blog.tags.findIndex(tag => tag.id === Number(e.target.value));
    const tag = tags.data.getTags.find(tag => tag.id === Number(e.target.value));
    const nextTags = blog.tags;
    if (index === -1) {
      nextTags.push(tag);
    } else {
      nextTags.splice(index, 1);
    }
    setBlog({ ...blog, tags: nextTags })
  };

  const parsetImageUpload = async (_, event) => {
    const items = (event.clipboardData || window.clipboardData).items;
    let file = null;
    if (items && items.length) {
      if (items[0].type.indexOf('image') !== -1) {
        file = items[0].getAsFile();
      }
    }
    if (file) {
      if (file && Math.ceil(file.size / 1024) > 1024) {
        notificaty.warning("文件过大，不能上传！");
        return;
      }
      notificaty.loading("图片上传中...", 0);
      setFile(file);
    }
  }

  const btnFile = () => {
    document.getElementById("btn_file").click();
  }

  const btnFileUpload = e => {
    const file = e.target.files[0];
    if (file) {
      if (file && Math.ceil(file.size / 1024) > 1024) {
        notificaty.warning("文件过大，不能上传！");
        return;
      }
      notificaty.loading("图片上传中...", 0);
      setFile(file);
    }
  }

  useEffect(() => {
    if (file) {
      uploadImages();
    }
  }, [file, uploadImages])

  const update = () => {
    notificaty.loading("保存中，请稍后...");
    type = "update";
    updateBlog();
  };

  const create = () => {
    notificaty.loading("创建中，请稍后...");
    type = "create";
    createBlog();
  };

  const saveDraft = () => {
    notificaty.loading("保存中，请稍后...");
    type = "draft";
    updateBlog();
  }

  const onEditorScroll = (_, { top, height }) => {
    const el = document.querySelector('#editor-preview');
    el.scrollTo(0, Math.round(top / height * (el.scrollHeight + el.clientHeight)));
  };

  const editorCls = classnames("editor", {
    "editor--fullScreen": editor.fullScreen,
    "editor--priview": editor.priview,
    "editor--edit": editor.edit,
  });

  return (
    <CRow>
      <CCol xs="12">
        <CCard>
          <CCardHeader>博客信息</CCardHeader>
          <CCardBody>
            <CFormGroup>
              <CLabel htmlFor="title">标题</CLabel>
              <CInput
                id="title"
                placeholder="请输入标题"
                type="text"
                value={blog.title || ""}
                onChange={e => setBlog({...blog, title: e.target.value})}
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="body">描述内容</CLabel>
              <CTextarea 
                name="body"
                id="body"
                rows="2"
                placeholder="请输入博客描述"
                value={blog.description}
                onChange={e => setBlog({ ...blog, description: e.target.value })}
              />
            </CFormGroup>
            <CFormGroup row>
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="category">类别</CLabel>
                  <CSelect
                    custom
                    name="category"
                    id="category"
                    value={blog.category}
                    onChange={e => setBlog({...blog, category: e.target.value})}
                  >
                    <option value="0">请选择类别</option>
                    {
                      categories.data && categories.data.getCategories && categories.data.getCategories.map(item => {
                        return <option key={item.id} value={item.id}>{item.name}</option>
                      })
                    }
                  </CSelect>
                </CFormGroup>
              </CCol>
              <CCol xs="6">
                <CFormGroup>
                  <CLabel htmlFor="topic">专题</CLabel>
                  <CSelect
                    custom
                    name="topic"
                    id="topic"
                    value={blog.topic}
                    onChange={e => { console.log(e.target.value); setBlog({ ...blog, topic: e.target.value }) }}
                  >
                    <option value={-1}>请选择专题</option>
                    {
                      topics.data && topics.data.getTopics && topics.data.getTopics.map(item => {
                        return <option key={item.key} value={item.id}>{item.name}</option>
                      })
                    }
                  </CSelect>
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="tag">标签</CLabel>
              <div className="form-group-checkbox--list">
                {
                  tags.data && tags.data.getTags && tags.data.getTags.map((item, index) => {
                    return (
                      <CFormGroup key={`tags-${index}`} variant="checkbox" className="checkbox">
                        <CInputCheckbox
                          id={item.id}
                          value={item.id || -1}
                          checked={blog.tags && (blog.tags.findIndex(_tag => _tag.id === item.id) !== -1)}
                          onChange={changeBlogTags}
                        />
                        <CLabel variant="checkbox" className="form-check-label" htmlFor={item.id}>{item.name}</CLabel>
                      </CFormGroup>
                    )
                  })
                }
              </div>
            </CFormGroup>
            <input type="file" id="btn_file" onChange={btnFileUpload} style={{ display: "none"}} />
          </CCardBody>
        </CCard>
        <CCard>
          <CCardHeader>博客内容</CCardHeader>
          <CCardBody>
            <div className={editorCls}>
              <div className="editor-tool">
                <div className="editor-tool-left">
                  <CButton size="sm" onClick={saveDraft}><CIcon name="cil-save" height="48" alt="save" /></CButton>
                  <CButton size="sm" onClick={blogKey ? update : create}><CIcon name="cil-send" height="48" alt="save" /></CButton>
                  <CButton size="sm" onClick={btnFile}><CIcon name="cil-image-plus" height="48" alt="save" /></CButton>
                </div>
                <div className="editor-tool-right">
                  <CButton size="sm" onClick={() => setEditor({ ...editor, priview: !editor.priview, edit: true })}>
                    <span alt="预览" className={classnames("caticon caticon-eye", { "caticon-eye--actived": !editor.priview} )} />
                  </CButton>
                  <CButton size="sm" onClick={() => setEditor({ ...editor, edit: !editor.edit, priview:true })}>
                    <span alt="编辑" className="caticon caticon-edit" />
                  </CButton>
                  <CButton size="sm" onClick={() => setEditor({...editor, fullScreen: !editor.fullScreen})}>
                    <span alt="全屏" className={classnames("caticon caticon-expand", { "caticon-expand--actived": editor.fullScreen})} />
                  </CButton>
                </div>
              </div>
              <div className="editor-main">
                <div className="editor-left">
                  <CodeMirror
                    className="cm-s-md-mirror"
                    value={blog.draft}
                    options={{
                      mode: 'markdown',
                      theme: 'material',
                      lineWrapping: true
                    }}
                    onBeforeChange={(editor, data, value) => {
                      setBlog({ ...blog, draft: value, body: value });
                    }}
                    onScroll={onEditorScroll}
                    onPaste={parsetImageUpload}
                    ref={codeMirrorRef}
                  />
                </div>
                <div className="editor-right">
                  <section
                    id="editor-preview"
                    dangerouslySetInnerHTML={{ __html: markdownParser.render(blog.draft || '') }}>
                  </section>
                </div>
              </div>
            </div>
          </CCardBody>
          <CCardFooter>
            {
              blogKey ? (
                <Fragment>
                  <CButton type="submit" color="primary" onClick={saveDraft}>保存草稿</CButton>
                  <CButton type="submit" color="primary" onClick={update}>保存并发布博客</CButton>
                </Fragment>
              ) : (<CButton type="submit" color="primary" onClick={create}>发布博客</CButton>)
            }
          </CCardFooter>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Edit