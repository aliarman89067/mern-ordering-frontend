import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: React.ReactNode;
};

export default function Auth0ProviderWithNavigate({ children }: Props) {
  const audience = import.meta.env.VITE_AUTH0_AUDIENCE;
  const domain = import.meta.env.VITE_AUTH0_DOMAIN;
  const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
  const redirectURI =
    import.meta.env.VITE_AUTH0_CALLBACK_URL ||
    import.meta.env.AUTH0_CALLBACK_URL;

  const navigate = useNavigate();

  if (!domain || !clientId || !redirectURI || !audience) {
    throw new Error("Unable to initialise auth");
  }
  const onRedirectCallback = (appState?: AppState) => {
    navigate(appState?.returnTo || "/auth-callback");
  };
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectURI,
        audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
}
