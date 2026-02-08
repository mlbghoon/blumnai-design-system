import type { Props } from '../../Icon/IconWrapper.types';

import { Icon } from '../../Icon/IconWrapper';

interface ThumbnailProps extends Props {
  /** 외부 이미지 URL 또는 경로. 제공되지 않으면 프레임만 표시됩니다. */
  imageSrc?: string;
}

export const FileThumbnail11MdIcon = ({ imageSrc, ...props }: ThumbnailProps) => {
  return (
    <Icon {...props}>
      <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<g clipPath="url(#FileThumbnail11MdIcon__clip0_3887_28212)">
<g filter="url(#FileThumbnail11MdIcon__filter0_di_3887_28212)">
<g>
        <path d="M0 4C0 1.79086 1.79086 0 4 0H28C30.2091 0 32 1.79086 32 4V28C32 30.2091 30.2091 32 28 32H4C1.79086 32 0 30.2091 0 28V4Z" fill="transparent" shapeRendering="crispEdges"/>
        {imageSrc ? (
          <image
            x="0"
            y="0"
            width="32"
            height="32"
            preserveAspectRatio="xMidYMid slice"
            href={imageSrc}
            clipPath={`url(#FileThumbnail11MdIcon__clip0_3887_28212)`}
          />
        ) : null}
      </g>
<path d="M4 0.25H28C30.0711 0.25 31.75 1.92893 31.75 4V28C31.75 30.0711 30.0711 31.75 28 31.75H4C1.92893 31.75 0.25 30.0711 0.25 28V4C0.25 1.92893 1.92893 0.25 4 0.25Z" style={{ fill: 'none' }} stroke="#27272A" strokeOpacity="0.15" strokeWidth="0.5" shape-rendering="crispEdges"/>
</g>
</g>
<defs>
<filter id="FileThumbnail11MdIcon__filter0_di_3887_28212" x="-3" y="-2" width="38" height="38" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="1.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3887_28212"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3887_28212" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-0.5"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_3887_28212"/>
</filter>

<clipPath id="FileThumbnail11MdIcon__clip0_3887_28212">
<rect width="32" height="32" style={{ fill: 'white' }}/>
</clipPath>

</defs>
</svg>
    </Icon>
  );
};
