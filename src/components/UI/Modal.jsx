import React from 'react';
import { createPortal } from 'react-dom';

const Modal = (props) => {
  return (
    <>
      {createPortal(
        <>
          <div className="min-h-screen flex items-center justify-center">
            <div
              className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-10 pointer-events-auto"
              onClick={props.onClickModal}
            ></div>
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-20 pointer-events-none ">
              <div className="relative">
                <div
                  className="flex justify-end text-2xl z-50 absolute right-4 top-2 text-white cursor-pointer  pointer-events-auto "
                  onClick={props.onClickModal}
                >
                  X
                </div>
                {props.children}
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
};

export default Modal;
