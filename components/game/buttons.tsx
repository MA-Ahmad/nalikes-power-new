import { cn } from '@/lib/utils'

export const ButtonDarkPurple = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative inline-block w-full min-w-[80px] px-3 py-2 cursor-pointer cut-corner-button"
        onClick={onClick}
      >
        <svg
          // width="125"
          // height="48"
          viewBox="0 0 125 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <foreignObject x="-60" y="-60" width="245" height="168">
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                backdropFilter: 'blur(30px)',
                clipPath: 'url(#bgblur_0_5013_5420_clip_path)',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </foreignObject>
          <g data-figma-bg-blur-radius="60">
            <path
              d="M7.13595 1.5491L1.97639 6.21335C0.718034 7.3509 0 8.96794 0 10.6642V42C0 45.3137 2.68629 48 6 48H113.84C115.327 48 116.761 47.448 117.864 46.4509L123.024 41.7867C124.282 40.6491 125 39.0321 125 37.3358V6C125 2.68629 122.314 0 119 0H11.1596C9.67275 0 8.2389 0.552038 7.13595 1.5491Z"
              fill="url(#paint0_linear_5013_5420)"
            />
            <path
              d="M11.1592 0.5H119C122.038 0.5 124.5 2.96243 124.5 6V37.3359C124.5 38.8908 123.842 40.3733 122.688 41.416L117.528 46.0801C116.517 46.9938 115.203 47.4999 113.841 47.5H6C2.96243 47.5 0.5 45.0376 0.5 42V10.6641C0.500053 9.10918 1.15808 7.6267 2.31152 6.58398L7.47168 1.91992C8.48258 1.00619 9.79653 0.500096 11.1592 0.5Z"
              stroke="#6F6BFF"
              stroke-opacity="0.6"
            />
          </g>
          <defs>
            <clipPath
              id="bgblur_0_5013_5420_clip_path"
              transform="translate(60 60)"
            >
              <path d="M7.13595 1.5491L1.97639 6.21335C0.718034 7.3509 0 8.96794 0 10.6642V42C0 45.3137 2.68629 48 6 48H113.84C115.327 48 116.761 47.448 117.864 46.4509L123.024 41.7867C124.282 40.6491 125 39.0321 125 37.3358V6C125 2.68629 122.314 0 119 0H11.1596C9.67275 0 8.2389 0.552038 7.13595 1.5491Z" />
            </clipPath>
            <linearGradient
              id="paint0_linear_5013_5420"
              x1="-20.5357"
              y1="0.461856"
              x2="-20.5357"
              y2="48.4948"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#6F6BFF" stop-opacity="0.2" />
              <stop offset="1" stop-color="#6F6BFF" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </div>
    </div>
  )
}

export const ButtonLightPurple = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative inline-block w-full min-w-[105px] px-3 py-2 cursor-pointer cut-corner-button"
        onClick={onClick}
      >
        <svg
          //   width="153"
          //   height="51"
          viewBox="0 0 153 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <g clip-path="url(#clip0_3308_19904)">
            <foreignObject
              x="-92.5087"
              y="-92.5087"
              width="338.017"
              height="236.017"
            >
              <div
                // @ts-ignore
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  backdropFilter: 'blur(46.25px)',
                  clipPath: 'url(#bgblur_1_3308_19904_clip_path)',
                  height: '100%',
                  width: '100%',
                }}
              ></div>
            </foreignObject>
            <g data-figma-bg-blur-radius="92.5087">
              <path
                d="M14.6013 1.69321L3.91605 9.23573C1.46039 10.9691 0 13.7876 0 16.7934V41.7491C0 46.8582 4.14176 51 9.25087 51H133.064C134.974 51 136.838 50.4085 138.399 49.3068L149.084 41.7643C151.54 40.0309 153 37.2124 153 34.2066V9.25087C153 4.14176 148.858 0 143.749 0H19.9361C18.0257 0 16.1621 0.591481 14.6013 1.69321Z"
                fill="url(#paint0_linear_3308_19904)"
              />
              <path
                d="M19.9365 0.770508H143.749C148.432 0.770508 152.229 4.56762 152.229 9.25098V34.207C152.229 36.9622 150.891 39.5459 148.64 41.1348L137.954 48.6768C136.523 49.6867 134.815 50.2295 133.063 50.2295H9.25098C4.56762 50.2295 0.770508 46.4324 0.770508 41.749V16.793C0.770646 14.0378 2.10947 11.4541 4.36035 9.86523L15.0459 2.32324C16.4766 1.31333 18.1853 0.770508 19.9365 0.770508Z"
                stroke="#6F6BFF"
                stroke-opacity="0.6"
                stroke-width="1.54181"
              />
            </g>
          </g>
          <defs>
            <clipPath
              id="bgblur_1_3308_19904_clip_path"
              transform="translate(92.5087 92.5087)"
            >
              <path d="M14.6013 1.69321L3.91605 9.23573C1.46039 10.9691 0 13.7876 0 16.7934V41.7491C0 46.8582 4.14176 51 9.25087 51H133.064C134.974 51 136.838 50.4085 138.399 49.3068L149.084 41.7643C151.54 40.0309 153 37.2124 153 34.2066V9.25087C153 4.14176 148.858 0 143.749 0H19.9361C18.0257 0 16.1621 0.591481 14.6013 1.69321Z" />
            </clipPath>
            <linearGradient
              id="paint0_linear_3308_19904"
              x1="-25.1357"
              y1="0.490722"
              x2="-25.1357"
              y2="51.5258"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#6F6BFF" stop-opacity="0.2" />
              <stop offset="1" stop-color="#6F6BFF" stop-opacity="0" />
            </linearGradient>
            <clipPath id="clip0_3308_19904">
              <rect width="152.639" height="50.8798" fill="white" />
            </clipPath>
          </defs>
        </svg>
        {children}
      </div>
    </div>
  )
}

export const ButtonLightPink1 = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative inline-block w-full min-w-[105px] px-3 py-2 cursor-pointer cut-corner-button">
        <svg
          //   width="153"
          //   height="51"
          viewBox="0 0 153 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <g clip-path="url(#clip0_3308_19904)">
            <foreignObject
              x="-92.5087"
              y="-92.5087"
              width="338.017"
              height="236.017"
            >
              <div
                // @ts-ignore
                xmlns="http://www.w3.org/1999/xhtml"
                style={{
                  backdropFilter: 'blur(46.25px)',
                  clipPath: 'url(#bgblur_1_3308_19904_clip_path)',
                  height: '100%',
                  width: '100%',
                }}
              ></div>
            </foreignObject>
            <g data-figma-bg-blur-radius="92.5087">
              <path
                d="M14.6013 1.69321L3.91605 9.23573C1.46039 10.9691 0 13.7876 0 16.7934V41.7491C0 46.8582 4.14176 51 9.25087 51H133.064C134.974 51 136.838 50.4085 138.399 49.3068L149.084 41.7643C151.54 40.0309 153 37.2124 153 34.2066V9.25087C153 4.14176 148.858 0 143.749 0H19.9361C18.0257 0 16.1621 0.591481 14.6013 1.69321Z"
                fill="url(#paint0_linear_3308_19904)"
              />
              <path
                d="M19.9365 0.770508H143.749C148.432 0.770508 152.229 4.56762 152.229 9.25098V34.207C152.229 36.9622 150.891 39.5459 148.64 41.1348L137.954 48.6768C136.523 49.6867 134.815 50.2295 133.063 50.2295H9.25098C4.56762 50.2295 0.770508 46.4324 0.770508 41.749V16.793C0.770646 14.0378 2.10947 11.4541 4.36035 9.86523L15.0459 2.32324C16.4766 1.31333 18.1853 0.770508 19.9365 0.770508Z"
                stroke="#EE4FFB"
                stroke-opacity="0.6"
                stroke-width="1.54181"
              />
            </g>
          </g>
          <defs>
            <clipPath
              id="bgblur_1_3308_19904_clip_path"
              transform="translate(92.5087 92.5087)"
            >
              <path d="M14.6013 1.69321L3.91605 9.23573C1.46039 10.9691 0 13.7876 0 16.7934V41.7491C0 46.8582 4.14176 51 9.25087 51H133.064C134.974 51 136.838 50.4085 138.399 49.3068L149.084 41.7643C151.54 40.0309 153 37.2124 153 34.2066V9.25087C153 4.14176 148.858 0 143.749 0H19.9361C18.0257 0 16.1621 0.591481 14.6013 1.69321Z" />
            </clipPath>
            {/* <linearGradient
              id="paint0_linear_3308_19904"
              x1="-25.1357"
              y1="0.490722"
              x2="-25.1357"
              y2="51.5258"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#6F6BFF" stop-opacity="0.2" />
              <stop offset="1" stop-color="#6F6BFF" stop-opacity="0" />
            </linearGradient> */}

            <linearGradient
              id="paint0_linear_5111_3982"
              x1="39.5"
              y1="0"
              x2="39.5"
              y2="48"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#EE4FFB" stop-opacity="0.2" />
              <stop offset="1" stop-color="#EE4FFB" stop-opacity="0" />
            </linearGradient>
            <clipPath id="clip0_3308_19904">
              <rect width="152.639" height="50.8798" fill="white" />
            </clipPath>
          </defs>
        </svg>
        {children}
      </div>
    </div>
  )
}

export const ButtonLightPink = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <div className="flex items-center">
      <div className="relative inline-block w-full min-w-[105px] px-3 py-3 cursor-pointer cut-corner-button">
        <svg
          // width="147"
          // height="48"
          viewBox="0 0 147 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <foreignObject x="-60" y="-60" width="267" height="168">
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                backdropFilter: 'blur(30px)',
                clipPath: 'url(#bgblur_0_5111_3982_clip_path)',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </foreignObject>
          <path
            data-figma-bg-blur-radius="60"
            d="M12.4463 0.5H141C144.038 0.5 146.5 2.96243 146.5 6V37.0439C146.5 38.7522 145.706 40.3642 144.352 41.4053L137.905 46.3604C136.944 47.0991 135.766 47.4999 134.554 47.5H6C2.96244 47.5 0.5 45.0376 0.5 42V10.9561C0.5 9.24784 1.29412 7.6358 2.64844 6.59473L9.09473 1.63965C10.0558 0.900853 11.2341 0.500093 12.4463 0.5Z"
            fill="url(#paint0_linear_5111_3982)"
            stroke="#EE4FFB"
          />
          <defs>
            <clipPath
              id="bgblur_0_5111_3982_clip_path"
              transform="translate(60 60)"
            >
              <path d="M12.4463 0.5H141C144.038 0.5 146.5 2.96243 146.5 6V37.0439C146.5 38.7522 145.706 40.3642 144.352 41.4053L137.905 46.3604C136.944 47.0991 135.766 47.4999 134.554 47.5H6C2.96244 47.5 0.5 45.0376 0.5 42V10.9561C0.5 9.24784 1.29412 7.6358 2.64844 6.59473L9.09473 1.63965C10.0558 0.900853 11.2341 0.500093 12.4463 0.5Z" />
            </clipPath>
            <linearGradient
              id="paint0_linear_5111_3982"
              x1="73.5"
              y1="0"
              x2="73.5"
              y2="48"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#EE4FFB" stop-opacity="0.2" />
              <stop offset="1" stop-color="#EE4FFB" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </div>
    </div>
  )
}

export const ButtonGreenOld = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className="flex items-center">
      <div className="relative inline-block w-full min-w-[105px] px-3 py-3 cursor-pointer cut-corner-button">
        <svg
          // width="141"
          // height="51"
          viewBox="0 0 141 51"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn('absolute inset-0 w-full h-full', className)}
          preserveAspectRatio="none"
        >
          <foreignObject
            x="-92.5289"
            y="-92.5289"
            width="325.394"
            height="235.949"
          >
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                backdropFilter: 'blur(46.26px)',
                clipPath: 'url(#bgblur_0_572_6182_clip_path)',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </foreignObject>
          <path
            data-figma-bg-blur-radius="92.5289"
            d="M19.0391 0.771484H131.083C135.767 0.771674 139.564 4.56867 139.564 9.25293V36.709C139.564 39.9126 137.759 42.843 134.898 44.2842L125.112 49.2129C123.929 49.8089 122.622 50.1201 121.297 50.1201H9.25293C4.56855 50.1201 0.771484 46.3221 0.771484 41.6377V14.1816C0.771519 10.9779 2.57622 8.04757 5.4375 6.60645L15.2236 1.67773C16.4071 1.08167 17.7139 0.771484 19.0391 0.771484Z"
            fill="url(#paint0_linear_572_6182)"
            stroke="#9CF350"
            stroke-width="1.54215"
          />
          <defs>
            <clipPath
              id="bgblur_0_572_6182_clip_path"
              transform="translate(92.5289 92.5289)"
            >
              <path d="M19.0391 0.771484H131.083C135.767 0.771674 139.564 4.56867 139.564 9.25293V36.709C139.564 39.9126 137.759 42.843 134.898 44.2842L125.112 49.2129C123.929 49.8089 122.622 50.1201 121.297 50.1201H9.25293C4.56855 50.1201 0.771484 46.3221 0.771484 41.6377V14.1816C0.771519 10.9779 2.57622 8.04757 5.4375 6.60645L15.2236 1.67773C16.4071 1.08167 17.7139 0.771484 19.0391 0.771484Z" />
            </clipPath>
            <linearGradient
              id="paint0_linear_572_6182"
              x1="70.1678"
              y1="0"
              x2="70.1678"
              y2="50.8909"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#9CF350" stop-opacity="0.2" />
              <stop offset="1" stop-color="#9CF350" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>

        {children}
      </div>
    </div>
  )
}

export const ButtonGreen = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative inline-block w-full min-w-[80px] px-3 py-2 cursor-pointer cut-corner-button">
        <svg
          // width="125"
          // height="48"
          viewBox="0 0 125 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <foreignObject x="-60" y="-60" width="245" height="168">
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                backdropFilter: 'blur(46.26px)',
                clipPath: 'url(#bgblur_0_5013_5420_0clip_path)',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </foreignObject>
          <g data-figma-bg-blur-radius="60">
            <path
              d="M7.13595 1.5491L1.97639 6.21335C0.718034 7.3509 0 8.96794 0 10.6642V42C0 45.3137 2.68629 48 6 48H113.84C115.327 48 116.761 47.448 117.864 46.4509L123.024 41.7867C124.282 40.6491 125 39.0321 125 37.3358V6C125 2.68629 122.314 0 119 0H11.1596C9.67275 0 8.2389 0.552038 7.13595 1.5491Z"
              fill="url(#paint01_linear_5013_5420)"
            />
            <path
              d="M11.1592 0.5H119C122.038 0.5 124.5 2.96243 124.5 6V37.3359C124.5 38.8908 123.842 40.3733 122.688 41.416L117.528 46.0801C116.517 46.9938 115.203 47.4999 113.841 47.5H6C2.96243 47.5 0.5 45.0376 0.5 42V10.6641C0.500053 9.10918 1.15808 7.6267 2.31152 6.58398L7.47168 1.91992C8.48258 1.00619 9.79653 0.500096 11.1592 0.5Z"
              stroke="#9CF350"
              stroke-opacity="0.6"
            />
          </g>
          <defs>
            <clipPath
              id="bgblur_0_5013_54200_clip_path"
              transform="translate(60 60)"
            >
              <path d="M7.13595 1.5491L1.97639 6.21335C0.718034 7.3509 0 8.96794 0 10.6642V42C0 45.3137 2.68629 48 6 48H113.84C115.327 48 116.761 47.448 117.864 46.4509L123.024 41.7867C124.282 40.6491 125 39.0321 125 37.3358V6C125 2.68629 122.314 0 119 0H11.1596C9.67275 0 8.2389 0.552038 7.13595 1.5491Z" />
            </clipPath>
            <linearGradient
              id="paint01_linear_5013_5420"
              x1="-20.5357"
              y1="0.461856"
              x2="-20.5357"
              y2="48.4948"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#9CF350" stop-opacity="0.2" />
              <stop offset="1" stop-color="#9CF350" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </div>
    </div>
  )
}

export const ButtonRed = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick: () => void
}) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative inline-block w-full min-w-[80px] px-3 py-2 cursor-pointer cut-corner-button"
        onClick={onClick}
      >
        <svg
          // width="125"
          // height="48"
          viewBox="0 0 125 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <foreignObject x="-60" y="-60" width="245" height="168">
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                backdropFilter: 'blur(46.26px)',
                clipPath: 'url(#bgblur_0_5013_5420_1clip_path)',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </foreignObject>
          <g data-figma-bg-blur-radius="60">
            <path
              d="M7.13595 1.5491L1.97639 6.21335C0.718034 7.3509 0 8.96794 0 10.6642V42C0 45.3137 2.68629 48 6 48H113.84C115.327 48 116.761 47.448 117.864 46.4509L123.024 41.7867C124.282 40.6491 125 39.0321 125 37.3358V6C125 2.68629 122.314 0 119 0H11.1596C9.67275 0 8.2389 0.552038 7.13595 1.5491Z"
              fill="url(#paint01_linear_5013_5420_1)"
            />
            <path
              d="M11.1592 0.5H119C122.038 0.5 124.5 2.96243 124.5 6V37.3359C124.5 38.8908 123.842 40.3733 122.688 41.416L117.528 46.0801C116.517 46.9938 115.203 47.4999 113.841 47.5H6C2.96243 47.5 0.5 45.0376 0.5 42V10.6641C0.500053 9.10918 1.15808 7.6267 2.31152 6.58398L7.47168 1.91992C8.48258 1.00619 9.79653 0.500096 11.1592 0.5Z"
              stroke="#F35050"
              stroke-opacity="0.6"
            />
          </g>
          <defs>
            <clipPath
              id="bgblur_0_5013_54200_1clip_path"
              transform="translate(60 60)"
            >
              <path d="M7.13595 1.5491L1.97639 6.21335C0.718034 7.3509 0 8.96794 0 10.6642V42C0 45.3137 2.68629 48 6 48H113.84C115.327 48 116.761 47.448 117.864 46.4509L123.024 41.7867C124.282 40.6491 125 39.0321 125 37.3358V6C125 2.68629 122.314 0 119 0H11.1596C9.67275 0 8.2389 0.552038 7.13595 1.5491Z" />
            </clipPath>
            <linearGradient
              id="paint01_linear_5013_5420_1"
              x1="-20.5357"
              y1="0.461856"
              x2="-20.5357"
              y2="48.4948"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#F35050" stop-opacity="0.2" />
              <stop offset="1" stop-color="#F35050" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </div>
    </div>
  )
}

export const ButtonPink = ({
  children,
  onClick,
}: {
  children: React.ReactNode
  onClick?: () => void
}) => {
  return (
    <div className="flex items-center gap-3">
      <div
        className="relative inline-block w-full min-w-[80px] px-3 py-2 cursor-pointer cut-corner-button"
        onClick={onClick}
      >
        <svg
          // width="125"
          // height="48"
          viewBox="0 0 125 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0 w-full h-full"
          preserveAspectRatio="none"
        >
          <foreignObject x="-60" y="-60" width="245" height="168">
            <div
              // @ts-ignore
              xmlns="http://www.w3.org/1999/xhtml"
              style={{
                backdropFilter: 'blur(46.26px)',
                clipPath: 'url(#bgblur_0_5013_5420_2clip_path)',
                height: '100%',
                width: '100%',
              }}
            ></div>
          </foreignObject>
          <g data-figma-bg-blur-radius="60">
            <path
              d="M7.13595 1.5491L1.97639 6.21335C0.718034 7.3509 0 8.96794 0 10.6642V42C0 45.3137 2.68629 48 6 48H113.84C115.327 48 116.761 47.448 117.864 46.4509L123.024 41.7867C124.282 40.6491 125 39.0321 125 37.3358V6C125 2.68629 122.314 0 119 0H11.1596C9.67275 0 8.2389 0.552038 7.13595 1.5491Z"
              fill="url(#paint01_linear_5013_5420_2)"
            />
            <path
              d="M11.1592 0.5H119C122.038 0.5 124.5 2.96243 124.5 6V37.3359C124.5 38.8908 123.842 40.3733 122.688 41.416L117.528 46.0801C116.517 46.9938 115.203 47.4999 113.841 47.5H6C2.96243 47.5 0.5 45.0376 0.5 42V10.6641C0.500053 9.10918 1.15808 7.6267 2.31152 6.58398L7.47168 1.91992C8.48258 1.00619 9.79653 0.500096 11.1592 0.5Z"
              stroke="#EE4FFB"
              stroke-opacity="0.6"
            />
          </g>
          <defs>
            <clipPath
              id="bgblur_0_5013_54200_2clip_path"
              transform="translate(60 60)"
            >
              <path d="M7.13595 1.5491L1.97639 6.21335C0.718034 7.3509 0 8.96794 0 10.6642V42C0 45.3137 2.68629 48 6 48H113.84C115.327 48 116.761 47.448 117.864 46.4509L123.024 41.7867C124.282 40.6491 125 39.0321 125 37.3358V6C125 2.68629 122.314 0 119 0H11.1596C9.67275 0 8.2389 0.552038 7.13595 1.5491Z" />
            </clipPath>
            <linearGradient
              id="paint01_linear_5013_5420_2"
              x1="-20.5357"
              y1="0.461856"
              x2="-20.5357"
              y2="48.4948"
              gradientUnits="userSpaceOnUse"
            >
              <stop stop-color="#EE4FFB" stop-opacity="0.2" />
              <stop offset="1" stop-color="#EE4FFB" stop-opacity="0" />
            </linearGradient>
          </defs>
        </svg>
        {children}
      </div>
    </div>
  )
}
