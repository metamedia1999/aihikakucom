declare namespace JSX {
  interface IntrinsicElements {
    'swiper-container': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement> & {
      init?: string;
    }, HTMLElement>;
    'swiper-slide': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}

interface HTMLElement {
  swiper?: {
    slideNext(): void;
    slidePrev(): void;
    update(): void;
    destroy(): void;
  };
}