import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import Editor from 'rich-markdown-editor';
import { debounce } from 'lodash';

import { APP_KEYS } from 'src/constants';

const element = document.getElementById('main');
const savedText = localStorage.getItem(APP_KEYS.EDITOR_DARK);
const exampleText = `
# Welcome
This is example content. It is persisted between reloads in localStorage.
`;
const defaultValue = savedText || exampleText;

const RichTextEditor: FC = () => {
  const [readOnly, setReadOnly] = useState(false);
  const [template, setTemplate] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem(APP_KEYS.EDITOR_DARK) === 'enabled');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [value, setValue] = useState<any>(undefined);

  const handleToggleReadOnly = () => {
    setReadOnly(!readOnly);
  };

  const handleToggleTemplate = () => {
    setTemplate(!template);
  };

  const handleToggleDark = () => {
    localStorage.setItem(APP_KEYS.EDITOR_DARK, !dark ? 'enabled' : 'disabled');
    setDark(!dark);
  };

  const handleUpdateValue = () => {
    const existing = localStorage.getItem(APP_KEYS.EDITOR_SAVED) || '';
    const newValue = `${existing}\n\nedit!`;

    localStorage.setItem(APP_KEYS.EDITOR_SAVED, newValue);

    setValue(newValue);
  };

  const handleChange = debounce(editorValue => {
    const text = editorValue();

    console.log(text);
    localStorage.setItem(APP_KEYS.EDITOR_SAVED, text);
  }, 250);

  const { body } = document;
  if (body) body.style.backgroundColor = dark ? '#181A1B' : '#FFF';

  return (
    <div>
      <div>
        <br />
        <button type="button" onClick={handleToggleReadOnly}>
          {readOnly ? 'Switch to Editable' : 'Switch to Read-only'}
        </button>
        <button type="button" onClick={handleToggleDark}>
          {dark ? 'Switch to Light' : 'Switch to Dark'}
        </button>
        <button type="button" onClick={handleToggleTemplate}>
          {template ? 'Switch to Document' : 'Switch to Template'}
        </button>
        <button type="button" onClick={handleUpdateValue}>
          Update value
        </button>
      </div>
      <br />
      <br />
      <Editor
        id="example"
        readOnly={readOnly}
        readOnlyWriteCheckboxes
        value={value}
        template={template}
        defaultValue={defaultValue}
        scrollTo={window.location.hash}
        onSave={options => console.log('Save triggered', options)}
        onCancel={() => console.log('Cancel triggered')}
        onChange={handleChange}
        dark={dark}
        autoFocus
      />
    </div>
  );
};

export default RichTextEditor;
