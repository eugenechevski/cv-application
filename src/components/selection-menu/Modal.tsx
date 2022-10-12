import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  icon,
} from "@fortawesome/fontawesome-svg-core/import.macro";

const Modal = (props: any) => {
  const { fileName } = props;
  const pdfFile = require(`src/assets/pdf/${fileName}.pdf`);
  const zoomPluginInstance = zoomPlugin();
  const { ZoomIn, ZoomOut } = zoomPluginInstance;

  return (
    <>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box bg-purple-200 relative">
          <label
            htmlFor="my-modal-3"
            className="purple-btn rounded-full px-2.5 absolute right-2 top-2 z-50 shadow-2xl border border-black"
          >
            <FontAwesomeIcon icon={solid("x")}></FontAwesomeIcon>
          </label>
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.15.349/build/pdf.worker.js">
            <Viewer fileUrl={pdfFile} plugins={[zoomPluginInstance]} />
          </Worker>
        </div>
      </div>
    </>
  );
};

export default Modal;
