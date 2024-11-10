/**
 * Icons from https://icones.js.org/collection/meteocons
 **/

import { SVGProps } from "react";

export const AirTemperature = (
  props: SVGProps<SVGSVGElement>,
): React.ReactNode => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <defs>
        <symbol id="meteoconsThermometerRaindrop0" viewBox="0 0 175 260.9">
          <path
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="15"
            d="M87.5 13.4c-48.7 72-80 117-80 160.7s35.8 79.3 80 79.3s80-35.5 80-79.3s-31.3-88.8-80-160.7Z"
          ></path>
        </symbol>
        <symbol id="meteoconsThermometerRaindrop1" viewBox="0 0 72 168">
          <circle cx="36" cy="132" r="36" fill="currentColor"></circle>
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="24"
            d="M36 12v120"
          >
            <animateTransform
              attributeName="transform"
              calcMode="spline"
              dur="1s"
              keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
              repeatCount="indefinite"
              type="translate"
              values="0 0; 0 18; 0 0"
            ></animateTransform>
          </path>
        </symbol>
        <symbol id="meteoconsThermometerRaindrop2" viewBox="0 0 118 278">
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="6"
            d="M115 218.2c0 31.4-25 56.8-56 56.8S3 249.6 3 218.2a57 57 0 0 1 24-46.6V35.5a32 32 0 1 1 64 0v136a57 57 0 0 1 24 46.7ZM63 83h28M63 51h28m-28 64h28"
          ></path>
        </symbol>
        <symbol id="meteoconsThermometerRaindrop3" viewBox="0 0 118 278">
          <use
            width="72"
            height="168"
            href="#meteoconsThermometerRaindrop1"
            transform="translate(23 87)"
          ></use>
          <use
            width="118"
            height="278"
            href="#meteoconsThermometerRaindrop2"
          ></use>
        </symbol>
        <clipPath id="meteoconsThermometerRaindrop4">
          <path
            fill="none"
            d="M334 392c-31 0-56-25.4-56-56.8a57 57 0 0 1 24-46.6V152.5a32.2 32.2 0 0 1 32-32.5H167.3v272Zm4-192h28m-28-32h28m-28 64h28"
          ></path>
        </clipPath>
      </defs>
      <g clipPath="url(#meteoconsThermometerRaindrop4)">
        <use
          width="175"
          height="260.9"
          href="#meteoconsThermometerRaindrop0"
          transform="translate(168.43 123.18)"
        ></use>
      </g>
      <use
        width="118"
        height="278"
        href="#meteoconsThermometerRaindrop3"
        transform="translate(275 117)"
      ></use>
    </svg>
  );
};

export const RelativeHumidity = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <defs>
        <symbol id="meteoconsHumidity0" viewBox="0 0 175 260.9">
          <path
            fill="none"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="15"
            d="M87.5 13.4c-48.7 72-80 117-80 160.7s35.8 79.3 80 79.3s80-35.5 80-79.3s-31.3-88.8-80-160.7Z"
          >
            <animateTransform
              additive="sum"
              attributeName="transform"
              calcMode="spline"
              dur="6s"
              keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
              repeatCount="indefinite"
              type="scale"
              values="1 1; 1 .9; 1 1"
            />
          </path>
        </symbol>
      </defs>
      <use
        width="175"
        height="260.9"
        href="#meteoconsHumidity0"
        transform="translate(168.4 123.18)"
      />
      <path
        fill="currentColor"
        d="M218.8 250.5q4.8-4.5 13.7-4.5t13.6 4.5q4.8 4.4 4.8 12.4v8q0 7.8-4.8 12.2t-13.6 4.4q-9 0-13.7-4.4t-4.8-12.2v-8q0-8 4.8-12.4Zm71.2-1.6a2.8 2.8 0 0 1-.6 2.6l-53 73.3a9.4 9.4 0 0 1-2.8 2.8a12.3 12.3 0 0 1-4.6.6h-4.4c-1.3 0-2.1-.4-2.5-1.1a2.8 2.8 0 0 1 .7-2.8l53-73.3a7 7 0 0 1 2.6-2.7a12.7 12.7 0 0 1 4.4-.5h4.9c1.2 0 2 .4 2.3 1.1Zm-57.5 7.6q-7.7 0-7.7 7v6.7q0 7 7.7 7t7.7-7v-6.8q0-6.9-7.7-6.9Zm33.4 36.4q4.7-4.5 13.7-4.5t13.6 4.5q4.8 4.5 4.8 12.4v8q0 7.8-4.8 12.2t-13.7 4.5q-8.9 0-13.6-4.4t-4.8-12.3v-8q0-8 4.8-12.4Zm13.6 6.1q-7.6 0-7.6 7v6.6q0 7 7.6 7t7.7-7v-6.7q0-6.9-7.7-6.9Z"
      />
    </svg>
  );
};

export const Pressure = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <circle
        cx="256"
        cy="256"
        r="144"
        fill="none"
        stroke="currentColor"
        strokeMiterlimit="10"
        strokeWidth="12"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="6"
        d="M256 200v-48m108 104h-48m-116 0h-48m180-68l-24 24m-104 0l-24-24m128 112l24 24m-152 0l24-24"
      />
      <circle cx="256" cy="256" r="24" fill="currentColor" />
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="12"
        d="M256 284V164"
      >
        <animateTransform
          attributeName="transform"
          calcMode="spline"
          dur="6s"
          keySplines=".42, 0, .58, 1; .42, 0, .58, 1; .42, 0, .58, 1; .42, 0, .58, 1; .42, 0, .58, 1; .42, 0, .58, 1"
          keyTimes="0; .17; .25; .42; .5; .67; 1"
          repeatCount="indefinite"
          type="rotate"
          values="-54 256 256; -15 256 256; -36 256 256; 36 256 256; 10 256 256; 115 256 256; -54 256 256"
        />
      </path>
    </svg>
  );
};

export const Wind = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <defs>
        <symbol id="meteoconsWind0" viewBox="0 0 342 234">
          <path
            fill="none"
            stroke="currentColor"
            strokeDasharray="148"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="18"
            d="M264.2 21.3A40 40 0 1 1 293 89H9"
          >
            <animate
              attributeName="stroke-dashoffset"
              dur="6s"
              repeatCount="indefinite"
              values="0; 2960"
            ></animate>
          </path>
          <path
            fill="none"
            stroke="currentColor"
            strokeDasharray="110"
            strokeLinecap="round"
            strokeMiterlimit="10"
            strokeWidth="18"
            d="M148.2 212.7A40 40 0 1 0 177 145H9"
          >
            <animate
              attributeName="stroke-dashoffset"
              dur="6s"
              repeatCount="indefinite"
              values="0; 1540"
            ></animate>
          </path>
        </symbol>
      </defs>
      <use
        width="342"
        height="234"
        href="#meteoconsWind0"
        transform="translate(85 139)"
      ></use>
    </svg>
  );
};

export const Voltage = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <defs>
        <symbol id="meteoconsLightningBolt0" viewBox="0 0 96 176">
          <path fill="currentColor" d="M32 0L0 96h32l-16 80L96 64H48L80 0H32z">
            <animate
              id="meteoconsLightningBolt1"
              attributeName="opacity"
              begin="0s; x1.end+.67s"
              dur="1.33s"
              keyTimes="0; .38; .5; .63; .75; .86; .94; 1"
              values="1; 1; 0; 1; 0; 1; 0; 1"
            ></animate>
          </path>
        </symbol>
      </defs>
      <use
        width="96"
        height="176"
        href="#meteoconsLightningBolt0"
        transform="translate(190.13 132.72)scale(1.36)"
      ></use>
    </svg>
  );
};

export const DewPointTemperature = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M15.5 10.5q-.413 0-.707-.293q-.293-.294-.293-.707q0-.271.113-.526q.112-.255.272-.473q.16-.218.33-.408q.17-.19.285-.324q.115.135.286.324q.17.19.33.408q.159.218.272.473q.112.255.112.526q0 .413-.293.707q-.294.293-.707.293Zm4-3q-.413 0-.707-.293q-.293-.294-.293-.707q0-.271.113-.526q.112-.255.272-.473q.16-.218.33-.408q.17-.19.285-.324q.115.135.286.324q.17.19.33.408q.159.218.272.473q.112.255.112.526q0 .413-.293.707q-.294.293-.707.293Zm0 6q-.413 0-.707-.293q-.293-.294-.293-.707q0-.271.113-.526q.112-.255.272-.473q.16-.218.33-.408q.17-.19.285-.324q.115.135.286.324q.17.19.33.408q.159.218.272.473q.112.255.112.526q0 .413-.293.707q-.294.293-.707.293ZM9.154 20q-1.671 0-2.836-1.164T5.154 16q0-1.046.525-1.959q.525-.912 1.475-1.503V6q0-.846.577-1.423Q8.308 4 9.154 4q.846 0 1.423.577q.577.577.577 1.423v6.538q.95.59 1.475 1.503T13.154 16q0 1.671-1.165 2.836T9.154 20Zm-3-4h6q0-.744-.4-1.437q-.398-.692-1.146-1.232L10.154 13V6q0-.425-.288-.712T9.154 5q-.425 0-.713.288T8.154 6v7l-.454.33q-.748.541-1.147 1.233q-.4.693-.4 1.437Z"
      ></path>
    </svg>
  );
};

export const SolarRadiation = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M216 186.7c-23.9 13.8-40 39.7-40 69.3H32c-17.7 0-32.2-14.4-30-31.9C10.7 154 47.8 92.7 101.3 52c14.1-10.7 33.8-5.3 42.7 10l72 124.7zM256 336c14.6 0 28.2-3.9 40-10.7l72 124.8c8.8 15.3 3.7 35.1-12.6 41.9c-30.6 12.9-64.2 20-99.4 20s-68.9-7.1-99.4-20c-16.3-6.9-21.4-26.6-12.6-41.9l72-124.8c11.8 6.8 25.4 10.7 40 10.7zm224-80H336c0-29.6-16.1-55.5-40-69.3L368 62c8.8-15.3 28.6-20.7 42.7-10c53.6 40.7 90.6 102 99.4 172.1c2.2 17.5-12.4 31.9-30 31.9zm-224-48a48 48 0 1 1 0 96a48 48 0 1 1 0-96z"
      ></path>
    </svg>
  );
};

export const ParticulateMatter25 = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 512 512"
      {...props}
    >
      <defs>
        <linearGradient
          id="meteoconsPollenFill0"
          x1="145"
          x2="161"
          y1="3.1"
          y2="30.9"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="currentColor"></stop>
          <stop offset=".5" stopColor="currentColor"></stop>
          <stop offset="1" stopColor="currentColor"></stop>
        </linearGradient>
        <linearGradient
          id="meteoconsPollenFill1"
          x1="190.3"
          x2="211.7"
          y1="54.5"
          y2="91.5"
          href="#meteoconsPollenFill0"
        ></linearGradient>
        <linearGradient
          id="meteoconsPollenFill2"
          x1="94.3"
          x2="115.7"
          y1="54.5"
          y2="91.5"
          href="#meteoconsPollenFill0"
        ></linearGradient>
        <linearGradient
          id="meteoconsPollenFill3"
          x1="9"
          x2="25"
          y1="67.1"
          y2="94.9"
          href="#meteoconsPollenFill0"
        ></linearGradient>
        <linearGradient
          id="meteoconsPollenFill4"
          x1="281"
          x2="297"
          y1="67.1"
          y2="94.9"
          href="#meteoconsPollenFill0"
        ></linearGradient>
        <linearGradient
          id="meteoconsPollenFill5"
          x1="227.7"
          x2="238.3"
          y1="15.8"
          y2="34.2"
          href="#meteoconsPollenFill0"
        ></linearGradient>
        <linearGradient
          id="meteoconsPollenFill6"
          x1="67.7"
          x2="78.3"
          y1="15.8"
          y2="34.2"
          href="#meteoconsPollenFill0"
        ></linearGradient>
        <symbol id="meteoconsPollenFill7" viewBox="0 0 306 98">
          <circle
            cx="153"
            cy="17"
            r="16"
            fill="url(#meteoconsPollenFill0)"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              begin="-0.33s"
              calcMode="spline"
              dur="3s"
              keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
              repeatCount="indefinite"
              type="translate"
              values="0 -30; 0 30; 0 -30"
            ></animateTransform>
          </circle>
          <circle
            cx="201"
            cy="73"
            r="21.3"
            fill="url(#meteoconsPollenFill1)"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              begin="-1.17s"
              calcMode="spline"
              dur="3s"
              keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
              repeatCount="indefinite"
              type="translate"
              values="0 -30; 0 30; 0 -30"
            ></animateTransform>
          </circle>
          <circle
            cx="105"
            cy="73"
            r="21.3"
            fill="url(#meteoconsPollenFill2)"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              begin="-1s"
              calcMode="spline"
              dur="3s"
              keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
              repeatCount="indefinite"
              type="translate"
              values="0 -30; 0 30; 0 -30"
            ></animateTransform>
          </circle>
          <circle
            cx="17"
            cy="81"
            r="16"
            fill="url(#meteoconsPollenFill3)"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              begin="-.67s"
              calcMode="spline"
              dur="3s"
              keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
              repeatCount="indefinite"
              type="translate"
              values="0 -30; 0 30; 0 -30"
            ></animateTransform>
          </circle>
          <circle
            cx="289"
            cy="81"
            r="16"
            fill="url(#meteoconsPollenFill4)"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              begin="-1.5s"
              calcMode="spline"
              dur="3s"
              keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
              repeatCount="indefinite"
              type="translate"
              values="0 -30; 0 30; 0 -30"
            ></animateTransform>
          </circle>
          <circle
            cx="233"
            cy="25"
            r="10.7"
            fill="url(#meteoconsPollenFill5)"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              begin="-1.33s"
              calcMode="spline"
              dur="3s"
              keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
              repeatCount="indefinite"
              type="translate"
              values="0 -30; 0 30; 0 -30"
            ></animateTransform>
          </circle>
          <circle
            cx="73"
            cy="25"
            r="10.7"
            fill="url(#meteoconsPollenFill6)"
            stroke="currentColor"
            strokeMiterlimit="10"
            strokeWidth="2"
          >
            <animateTransform
              attributeName="transform"
              begin="-.83s"
              calcMode="spline"
              dur="3s"
              keySplines=".42, 0, .58, 1; .42, 0, .58, 1"
              repeatCount="indefinite"
              type="translate"
              values="0 -30; 0 30; 0 -30"
            ></animateTransform>
          </circle>
        </symbol>
      </defs>
      <use
        width="306"
        height="98"
        href="#meteoconsPollenFill7"
        transform="translate(103 207)"
      ></use>
    </svg>
  );
};
