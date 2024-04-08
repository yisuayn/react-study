import React, { forwardRef, useEffect, useState } from 'react'
import { Form, Input, Select } from 'antd';
const { Option } = Select;

const userform = forwardRef((props, ref) => {
    const [isDisable, setisDisable] = useState(false)

    useEffect(()=>{
        setisDisable(props.IsUpdatadisabled)
    },[props.IsUpdatadisabled])
    return (
        <div>
            <Form
                ref={ref}
                layout="vertical"
                initialValues={{
                    modifier: 'public',
                }}
            >
                <Form.Item
                    name="username"
                    label="用户名"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="password"
                    label="密码"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="region"
                    label="区域"
                    rules={isDisable ? [] : [
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Select disabled={isDisable}>
                        {
                            props.regionList.map(item =>
                                <Option value={item.value} key={item.id}>{item.title}</Option>
                            )
                        }
                    </Select>
                </Form.Item>
                <Form.Item
                    name="roleId"
                    label="角色"
                    rules={[
                        {
                            required: true,
                            message: 'Please input the title of collection!',
                        },
                    ]}
                >
                    <Select onChange={(value) => {
                        if (value === 1) {
                            setisDisable(true)
                            ref.current.setFieldsValue({
                                region: '全球'
                            })
                        } else {
                            setisDisable(false)
                        }
                    }}>
                        {props.roleList.map(item =>
                            <Option value={item.id} key={item.id}>{item.roleName}</Option>)}
                    </Select>
                </Form.Item>
                <Form.Item name="description" label="Description">
                    <Input type="textarea" />
                </Form.Item>
            </Form>
        </div>
    )
})
export default userform
