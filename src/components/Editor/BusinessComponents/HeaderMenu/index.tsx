/**
 *坐标尺组件
 * code bu chunyuan.zhang
 *
 * **/
import React, { useRef, useMemo, useState } from 'react';
import { history } from 'umi';
import { Button, Upload, Modal, Popover } from 'antd';
import QRCode from 'qrcode.react';
import { RedoOutlined } from '@ant-design/icons';
import { saveAs } from 'file-saver';
import Core from '../../Core';
import styles from './index.less';

const HeaderMenu: React.FC<{
  addTemplate: Function;
  addPage: Function;
}> = (props) => {
  const { addTemplate, addPage } = props;
  const [showModalIframe, setShowModalIframe] = useState(false);
  const [showFaceModal, setShowFaceModal] = useState(false);
  let uuid = Core.uuid(36, 10);
  const downLoadJson = () => {
    let pageData = localStorage.getItem('pages') || '[]';
    const blob = new Blob([pageData], { type: 'text/plain;charset=utf-8' });
    saveAs(blob, 'template.json');
  };

  const uploadprops = useMemo(
    () => ({
      name: 'file',
      showUploadList: false,
      beforeUpload(file: File) {
        // 解析并提取excel数据
        let reader = new FileReader();
        reader.onload = function (e: Event) {
          let data = (e as any).target.result;
          console.log(JSON.parse(data));
          localStorage.setItem('userPage', data);
        };
        reader.readAsText(file);
      },
    }),
    [],
  );

  const handleReloadPage = () => {
    document.getElementById('previewPage')?.contentWindow.location.reload();
  };

  const generatePoster = () => {
    setShowModalIframe(true);
    // setTimeout(() => {
    //   setShowFaceModal(true);
    // }, 3600);
  };
  const content = () => {
    return (
      <QRCode
        value={`${window.location.protocol}//${window.location.host}/preview?id=983370528331195227483415799255597789 `}
      />
    );
  };

  const savePage = () => {
    const localPointData = localStorage.getItem('pointData') || '[]';
    const localUserData = localStorage.getItem('userData') || '[]';
    addPage({
      id: uuid,
      name: '测试界面',
      path: uuid,
      version: 1,
      children: {
        pointData: JSON.parse(localPointData),
        userData: JSON.parse(localUserData),
      },
    });
  };
  return (
    <div className={styles.headerContainer}>
      <Button
        type="link"
        onClick={() => {
          let uuid = Core.uuid(36, 10);
          const localPointData = localStorage.getItem('pointData') || '[]';
          const localUserData = localStorage.getItem('userData') || '[]';
          addTemplate({
            id: uuid,
            name: '测试模板',
            version: 1,
            pointData: JSON.parse(localPointData),
            userData: JSON.parse(localUserData),
          });
        }}
      >
        保存模板
      </Button>

      <Button
        type="link"
        onClick={() => {
          savePage();
        }}
      >
        发布界面
      </Button>

      <Upload {...uploadprops}>
        <Button type="link" style={{ marginRight: '8px' }}>
          上传json文件
        </Button>
      </Upload>
      <Button
        type="link"
        style={{ marginRight: '9px' }}
        title="下载json文件"
        onClick={downLoadJson}
      >
        下载json文件
      </Button>
      <Button
        type="link"
        onClick={() => {
          savePage();
          window.open(
            `${window.location.protocol}//${window.location.host}/#/preview?id=${uuid}&&isH5=true`,
          );
        }}
      >
        预览
      </Button>

      <Popover content={content}>
        <Button type="link" style={{ marginRight: '9px' }} title="下载json文件">
          在线预览
        </Button>
      </Popover>

      <Button
        type="link"
        style={{ marginRight: '9px' }}
        title="下载json文件"
        onClick={generatePoster}
      >
        图片海报生成
      </Button>

      <Modal
        title="生成封面中...(长时间未反应请点右侧按钮重试)"
        visible={showModalIframe}
        footer={null}
        width={414}
        closeIcon={<RedoOutlined />}
        destroyOnClose={true}
        onCancel={handleReloadPage}
        maskClosable={false}
      >
        <a
          onClick={() => {
            let iframeWindow = document.getElementById('previewPage').contentWindow;

            iframeWindow.generateImg((blob) => {
              saveAs(blob, 'inbiz海报');
            });

            setShowModalIframe(false);
          }}
        >
          {' '}
          下载
        </a>
        <iframe
          id="previewPage"
          // src={`/preview?tid=${props.location.query.tid}`}
          src={`#/previews?id=983370528331195227483415799255597789`}
          style={{ width: '100%', border: 'none', height: '600px' }}
        ></iframe>
      </Modal>
      <Modal
        title="封面图(右键复制图片)"
        visible={showFaceModal}
        footer={null}
        width={414}
        destroyOnClose={true}
        onCancel={() => setShowFaceModal(false)}
      >
        <img src={''} style={{ width: '100%' }} />
      </Modal>
    </div>
  );
};

export default HeaderMenu;
