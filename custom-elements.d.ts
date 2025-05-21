// custom-elements.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'swiper-container': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        init?: string | boolean;
        slidesPerView?: string | number;
        spaceBetween?: string | number;
        navigation?: string | boolean;
        pagination?: string | boolean | {
          clickable?: boolean;
          [key: string]: any;
        };
        breakpoints?: {
          [key: string]: any;
        };
        [key: string]: any;
      },
      HTMLElement
    >;
    'swiper-slide': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
