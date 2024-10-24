export {};

declare global {
  interface Window {
    config: {
      background_color: string;
      tenant: string;
      card: string;
      icon: string;
      favicon: string;
      logo: string;
      bannerLogin: string;
      theme_color: string;
      loginUrl: string;
      baseUrl: string;
      cardTransporte: string;
      cardTransportePne: string;
      cardTransporteSenior: string;
      cardTransporteEstudante: string;
      cardGratuidade: string;
      nomeUser: string;
    }; 
}