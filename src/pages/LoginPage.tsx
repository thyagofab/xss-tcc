import { useRef, useState } from 'react';
import type { Usuario } from '../types/domain';
import { Button } from '../components/atoms/Button';
import { TextInput } from '../components/atoms/TextInput';

interface LoginPageProps {
  usuarioLogado: Usuario | null;
  autenticando: boolean;
  erroAutenticacao: string;
  mensagemSucesso: string;
  aoLogin: (username: string, senha: string) => Promise<void>;
  aoRegistrar: (username: string, senha: string) => Promise<void>;
  aoLogout: () => void;
  aoIrParaCadastro?: () => void;
}

export const LoginPage = ({
  usuarioLogado,
  autenticando,
  erroAutenticacao,
  mensagemSucesso,
  aoLogin,
  aoRegistrar,
  aoLogout,
  aoIrParaCadastro
}: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erroLocal, setErroLocal] = useState('');
  const emailRef = useRef<HTMLInputElement | null>(null);
  const senhaRef = useRef<HTMLInputElement | null>(null);

  const limparCampos = () => {
    setEmail('');
    setSenha('');
    setErroLocal('');
  };

  const fazerLogin = async () => {
    const emailAtual = (emailRef.current?.value ?? email).trim();
    const senhaAtual = senhaRef.current?.value ?? senha;

    if (!emailAtual || !senhaAtual) {
      setErroLocal('Preencha e-mail e senha para continuar.');
      return;
    }

    setErroLocal('');
    await aoLogin(emailAtual, senhaAtual);
    limparCampos();
  };

  const fazerRegistro = async () => {
    const usernameAtual = (emailRef.current?.value ?? email).trim();
    const senhaAtual = senhaRef.current?.value ?? senha;

    if (!usernameAtual || !senhaAtual) {
      setErroLocal('Preencha usuario e senha para continuar.');
      return;
    }

    setErroLocal('');
    await aoRegistrar(usernameAtual, senhaAtual);
    limparCampos();
  };

  return (
    <>
      <section className="login-hero">
        <div className="login-hero__content">
          <h1>Bem-vindo à Nexora Tech</h1>
          <p>
            Faça login ou crie sua conta para acessar todas as funcionalidades, comentar em produtos e acompanhar seus pedidos.
          </p>
        </div>
      </section>

      <section className="pagina-login" id="login-section">
      <div className="pagina-login__card">
        <p className="kicker">Conta do usuario</p>
        <h2>Entrar ou registrar</h2>

        {usuarioLogado ? (
          <div className="usuario-logado-box">
            <span>Voce esta logado como <strong>{usuarioLogado.username}</strong></span>
            <Button type="button" variant="ghost" size="sm" onClick={aoLogout}>
              Sair da conta
            </Button>
          </div>
        ) : (
          <>
            <p className="pagina-login__texto">
              Use sua conta para comentar nos produtos e identificar a autoria dos comentarios.
            </p>
            <div className="auth-form-grid">
              <TextInput
                name="email"
                type="email"
                placeholder="E-mail"
                value={email}
                ref={emailRef}
                onChange={(event) => setEmail(event.target.value)}
              />
              <TextInput
                name="password"
                type="password"
                placeholder="Senha"
                value={senha}
                ref={senhaRef}
                onChange={(event) => setSenha(event.target.value)}
              />
            </div>
            <div className="auth-actions">
              <Button
                type="button"
                onClick={() => {
                  void fazerLogin();
                }}
                disabled={autenticando}
              >
                {autenticando ? 'Entrando...' : 'Entrar'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  if (aoIrParaCadastro) {
                    aoIrParaCadastro();
                  } else {
                    void fazerRegistro();
                  }
                }}
                disabled={autenticando}
              >
                Criar conta
              </Button>
            </div>
            {erroLocal ? <p className="auth-error">{erroLocal}</p> : null}
            {erroAutenticacao ? <p className="auth-error">{erroAutenticacao}</p> : null}
            {mensagemSucesso ? <p className="auth-success">{mensagemSucesso}</p> : null}
          </>
        )}
      </div>
    </section>
    </>
  );
};