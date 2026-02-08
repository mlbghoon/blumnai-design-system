import type { Props } from '../../Icon/IconWrapper.types';

import { Icon } from '../../Icon/IconWrapper';

interface ThumbnailProps extends Props {
  /** 외부 이미지 URL 또는 경로. 제공되지 않으면 프레임만 표시됩니다. */
  imageSrc?: string;
}

export const FileThumbnail11LgIcon = ({ imageSrc, ...props }: ThumbnailProps) => {
  return (
    <Icon {...props}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
<g clipPath="url(#FileThumbnail11LgIcon__clip0_3887_28206)">
<g filter="url(#FileThumbnail11LgIcon__filter0_di_3887_28206)">
<g>
        <path d="M0 4C0 1.79086 1.79086 0 4 0H36C38.2091 0 40 1.79086 40 4V36C40 38.2091 38.2091 40 36 40H4C1.79086 40 0 38.2091 0 36V4Z" fill="transparent" shapeRendering="crispEdges"/>
        {imageSrc ? (
          <image
            x="0"
            y="0"
            width="40"
            height="40"
            preserveAspectRatio="xMidYMid slice"
            href={imageSrc}
            clipPath={`url(#FileThumbnail11LgIcon__clip0_3887_28206)`}
          />
        ) : null}
      </g>
<path d="M4 0.25H36C38.0711 0.25 39.75 1.92893 39.75 4V36C39.75 38.0711 38.0711 39.75 36 39.75H4C1.92893 39.75 0.25 38.0711 0.25 36V4C0.250001 1.92893 1.92893 0.25 4 0.25Z" style={{ fill: 'none' }} stroke="#27272A" strokeOpacity="0.15" strokeWidth="0.5" shape-rendering="crispEdges"/>
</g>
</g>
<defs>
<filter id="FileThumbnail11LgIcon__filter0_di_3887_28206" x="-1" y="0" width="42" height="42" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
<feFlood floodOpacity="0" result="BackgroundImageFix"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="1"/>
<feGaussianBlur stdDeviation="0.5"/>
<feComposite in2="hardAlpha" operator="out"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.06 0"/>
<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_3887_28206"/>
<feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_3887_28206" result="shape"/>
<feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
<feOffset dy="-0.5"/>
<feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1"/>
<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"/>
<feBlend mode="normal" in2="shape" result="effect2_innerShadow_3887_28206"/>
</filter>

<clipPath id="FileThumbnail11LgIcon__clip0_3887_28206">
<rect width="40" height="40" style={{ fill: 'white' }}/>
</clipPath>

</defs>
</svg>
    </Icon>
  );
};
