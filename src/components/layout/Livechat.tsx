import React from 'react';

export const Livechat = () => {
  return (
    <div>
      <a
        href="https://wa.link/vxf5uq"
        // href="https://t.me/+nyuh5dMaDsliZDA0"
        className="whatsapp_float right-6 bottom-[70px] cursor-pointer  tracking-wider transition duration-300 ease-in-out md:bottom-10 md:right-10"
        target="_blank"
        rel="noreferrer"
      >
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0"
          y="0"
          enableBackground="new 0 0 512 512"
          version="1.1"
          viewBox="0 0 512 512"
          xmlSpace="preserve"
        >
          <path
            fill="#EDEDED"
            d="M0 512l35.31-128C12.359 344.276 0 300.138 0 254.234 0 114.759 114.759 0 255.117 0S512 114.759 512 254.234 395.476 512 255.117 512c-44.138 0-86.51-14.124-124.469-35.31L0 512z"
          ></path>
          <path
            fill="#55CD6C"
            d="M137.71 430.786l7.945 4.414c32.662 20.303 70.621 32.662 110.345 32.662 115.641 0 211.862-96.221 211.862-213.628S371.641 44.138 255.117 44.138 44.138 137.71 44.138 254.234c0 40.607 11.476 80.331 32.662 113.876l5.297 7.945-20.303 74.152 75.916-19.421z"
          ></path>
          <path
            fill="#FEFEFE"
            d="M187.145 135.945l-16.772-.883c-5.297 0-10.593 1.766-14.124 5.297-7.945 7.062-21.186 20.303-24.717 37.959-6.179 26.483 3.531 58.262 26.483 90.041s67.09 82.979 144.772 105.048c24.717 7.062 44.138 2.648 60.028-7.062 12.359-7.945 20.303-20.303 22.952-33.545l2.648-12.359c.883-3.531-.883-7.945-4.414-9.71l-55.614-25.6c-3.531-1.766-7.945-.883-10.593 2.648l-22.069 28.248c-1.766 1.766-4.414 2.648-7.062 1.766-15.007-5.297-65.324-26.483-92.69-79.448-.883-2.648-.883-5.297.883-7.062l21.186-23.834c1.766-2.648 2.648-6.179 1.766-8.828l-25.6-57.379c-.884-2.649-3.532-5.297-7.063-5.297"
          ></path>
        </svg> */}

        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
          <path fill="#29b6f6" d="M24 4a20 20 0 100 40 20 20 0 100-40z"></path>
          <path
            fill="#fff"
            d="M33.95 15l-3.746 19.126s-.161.874-1.245.874c-.576 0-.873-.274-.873-.274l-8.114-6.733-3.97-2.001-5.095-1.355S10 24.375 10 23.625c0-.625.933-.923.933-.923l21.316-8.468c-.001-.001.651-.235 1.126-.234.292 0 .625.125.625.5 0 .25-.05.5-.05.5z"
          ></path>
          <path
            fill="#b0bec5"
            d="M23 30.505l-3.426 3.374s-.149.115-.348.12a.494.494 0 01-.219-.043l.964-5.965L23 30.505z"
          ></path>
          <path
            fill="#cfd8dc"
            d="M29.897 18.196a.5.5 0 00-.701-.093L16 26s2.106 5.892 2.427 6.912c.322 1.021.58 1.045.58 1.045l.964-5.965 9.832-9.096a.499.499 0 00.094-.7z"
          ></path>
        </svg> */}

        {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path fill="none" d="M0 0H256V256H0z"></path>
          <path
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            d="M45.4 177A95.9 95.9 0 1179 210.6h0L45.8 220a7.9 7.9 0 01-9.8-9.8l9.4-33.2z"
          ></path>
          <path
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            d="M96 112L160 112"
          ></path>
          <path
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            d="M96 144L160 144"
          ></path>
        </svg> */}

        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
          <path fill="none" d="M0 0H256V256H0z"></path>
          <path
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            d="M132 216H47.7a7.6 7.6 0 01-7.7-7.7V124a92 92 0 0192-92h0a92 92 0 0192 92h0a92 92 0 01-92 92z"
          ></path>
          <path
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            d="M100 112L160 112"
          ></path>
          <path
            fill="none"
            stroke="#ffffff"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="16"
            d="M100 144L160 144"
          ></path>
        </svg>
      </a>

      {/* #000410 */}

      <style jsx>
        {`
          .whatsapp-icon {
            margin-top: 16px;
          }
          /* for mobile */

          .whatsapp-icon {
            margin-top: 10px;
          }
          .whatsapp_float {
            position: fixed;
            width: 57px;
            height: 57px;
            font-size: 22px;
            background-color: #50185f;
            color: #fff;
            border-radius: 50px;
            text-align: center;
            font-size: 25px;
            z-index: 1000;
            padding: 7px;
          }

          .beamer_defaultBeamerSelector {
            display: none !important;
          }
        `}
      </style>
    </div>
  );
};

// <body>
//   <script
//     dangerouslySetInnerHTML={{
//       __html: `
//             function initFreshChat() {
//   window.fcWidget.init({
//     	 token: "3ba59650-edf4-4770-a166-d26a3a9c7f9e",
//   host: "https://whispersms.freshchat.com"
//   });
// }

// function initialize(i,t){var e;i.getElementById(t)?
// initFreshChat():((e=i.createElement("script")).id=t,e.async=!0,
// e.src="https://whispersms.freshchat.com/js/widget.js",e.onload=initFreshChat,i.head.appendChild(e))}
// function initiateCall(){initialize(document,"Freshchat-js-sdk")}
// window.addEventListener?window.addEventListener("load",initiateCall,!1):
// window.attachEvent("load",initiateCall,!1);
// `,
//     }}
//   />
// </body>

// <Freshchat
//   token={'3ba59650-edf4-4770-a166-d26a3a9c7f9e'}
//   host={'https://whispersms.freshchat.com'}
//   externalId={email}
//   firstName={first_name}
//   lastName={last_name}
//   phone={phone_number}
// />
