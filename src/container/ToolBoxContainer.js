import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initTool } from '../modules/tool';
import ToolBoxForm from '../components/ToolBoxForm';
import { getApi } from '../modules/tool';

const ToolBoxContainer = () => {
  const dispatch = useDispatch();

  const { form, loaded } = useSelector(({ tool }) => ({
    form: tool.form,
    loaded: tool.loaded,
  }))

  const onChange = e => {
    const { value, name } = e.target;

    dispatch(
      changeField({
        key: name,
        value: value,
      })
    )
  }

  const onSubmit = e => {
    e.preventDefault();
    const { apiUrl, duplicateData } = form;

    dispatch(
      getApi({
        apiUrl,
        duplicateData,
      })
    )

    dispatch(
      initTool()
    )
  }

  return (
    <>
      <ToolBoxForm
        form={form}
        loaded={loaded}
        onChange={onChange}
        onSubmit={onSubmit}></ToolBoxForm>
    </>
  )
}

export default ToolBoxContainer;