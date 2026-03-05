import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreTemplate } from '../components/templates/StoreTemplate';
import { LoginPage } from './LoginPage';
import type { Usuario } from '../types/domain';

const API_BASE = 'http://localhost:3001/api';
const CHAVE_TOKEN_LOCALSTORAGE = 'token_usuario_tcc';
const CHAVE_COOKIE_SESSAO = 'token_usuario_tcc';

type AlvoNavegacao = 'home' | 'ofertas' | 'categorias' | 'contato' | 'login';

export const ContaPage = () => {
  const navigate = useNavigate();
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);
  const [autenticando, setAutenticando] = useState(false);
  const [erroAutenticacao, setErroAutenticacao] = useState('');

  useEffect(() => {
    const tokenArmazenado = localStorage.getItem(CHAVE_TOKEN_LOCALSTORAGE) ?? '';

    if (tokenArmazenado) {
      const carregarSessao = async () => {
        try {
          const resposta = await fetch(`${API_BASE}/auth/me`, {
            headers: {
              Authorization: `Bearer ${tokenArmazenado}`
            }
          });

          if (!resposta.ok) {
            localStorage.removeItem(CHAVE_TOKEN_LOCALSTORAGE);
            return;
          }

          const dados = (await resposta.json()) as { user: Usuario };
          // Mantem cookie inseguro sincronizado para demonstracao de XSS.
          document.cookie = `${CHAVE_COOKIE_SESSAO}=${encodeURIComponent(tokenArmazenado)}; path=/; SameSite=Lax`;
          setUsuarioLogado(dados.user);
        } catch {
          localStorage.removeItem(CHAVE_TOKEN_LOCALSTORAGE);
        }
      };

      void carregarSessao();
    }
  }, []);

  const aoBuscar = (termoBusca: string) => {
    const query = termoBusca.trim();
    const sufixo = query ? `?q=${encodeURIComponent(query)}` : '';
    navigate(`/${sufixo}`);
  };

  const aoNavegar = (destino: AlvoNavegacao) => {
    if (destino === 'login') {
      return;
    }

    navigate('/');
  };

  const salvarSessao = (token: string, user: Usuario) => {
    localStorage.setItem(CHAVE_TOKEN_LOCALSTORAGE, token);
    // Intencionalmente inseguro para demonstracao de XSS no TCC.
    document.cookie = `${CHAVE_COOKIE_SESSAO}=${encodeURIComponent(token)}; path=/; SameSite=Lax`;
    setUsuarioLogado(user);
    setErroAutenticacao('');
  };

  const autenticar = async (rota: 'login' | 'register', username: string, senha: string) => {
    setAutenticando(true);
    setErroAutenticacao('');

    try {
      const resposta = await fetch(`${API_BASE}/auth/${rota}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password: senha })
      });

      const dados = (await resposta.json().catch(() => null)) as { error?: string; token?: string; user?: Usuario } | null;

      if (!resposta.ok || !dados?.token || !dados.user) {
        setErroAutenticacao(dados?.error ?? 'Falha ao autenticar usuario.');
        return;
      }

      salvarSessao(dados.token, dados.user);
    } catch {
      setErroAutenticacao('Nao foi possivel autenticar. Confira se a API esta rodando.');
    } finally {
      setAutenticando(false);
    }
  };

  const fazerLogin = async (username: string, senha: string) => {
    await autenticar('login', username, senha);
  };

  const fazerRegistro = async (username: string, senha: string) => {
    await autenticar('register', username, senha);
  };

  const fazerLogout = () => {
    localStorage.removeItem(CHAVE_TOKEN_LOCALSTORAGE);
    document.cookie = `${CHAVE_COOKIE_SESSAO}=; path=/; Max-Age=0; SameSite=Lax`;
    setUsuarioLogado(null);
  };

  return (
    <StoreTemplate
      consulta=""
      aoBuscar={aoBuscar}
      navegacaoAtiva="login"
      aoNavegar={aoNavegar}
      usuarioLogado={usuarioLogado}
    >
      <LoginPage
        usuarioLogado={usuarioLogado}
        autenticando={autenticando}
        erroAutenticacao={erroAutenticacao}
        aoLogin={fazerLogin}
        aoRegistrar={fazerRegistro}
        aoLogout={fazerLogout}
      />
    </StoreTemplate>
  );
};
