"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { SignOut, Wallet, X } from "@phosphor-icons/react";
import { useLocale } from "next-intl";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function shortAddr(a?: string) {
  return a ? `${a.slice(0, 6)}...${a.slice(-4)}` : "";
}

const copy = {
  es: {
    connect: "Conectar",
    title: "Conecta tu wallet",
    body: "Elige cómo quieres conectarte. Solo pedimos tu dirección pública.",
    injected: "Wallet del navegador",
    injectedHint: "MetaMask, Valora, MiniPay, Rabby",
    walletConnect: "WalletConnect",
    walletConnectHint: "Escanea un QR con tu wallet móvil",
    noInjected: "No se detectó una wallet en este navegador",
    connected: "Wallet conectada",
    disconnect: "Desconectar",
    close: "Cerrar",
    failed: "No se pudo conectar. Intenta de nuevo.",
  },
  en: {
    connect: "Connect",
    title: "Connect your wallet",
    body: "Choose how you want to connect. We only ask for your public address.",
    injected: "Browser wallet",
    injectedHint: "MetaMask, Valora, MiniPay, Rabby",
    walletConnect: "WalletConnect",
    walletConnectHint: "Scan a QR code with your mobile wallet",
    noInjected: "No wallet was detected in this browser",
    connected: "Wallet connected",
    disconnect: "Disconnect",
    close: "Close",
    failed: "Could not connect. Please try again.",
  },
} as const;

type Props = { className?: string; onOpen?: () => void };

export function ConnectWallet({ className, onOpen }: Props) {
  const locale = useLocale();
  const c = locale === "es" ? copy.es : copy.en;
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect({
    onSuccess: () => setOpen(false),
  });
  const { disconnect } = useDisconnect();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const label = (id: string) =>
    id === "walletConnect"
      ? { name: c.walletConnect, hint: c.walletConnectHint }
      : { name: c.injected, hint: c.injectedHint };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          onOpen?.();
          setOpen(true);
        }}
        className={className}
      >
        {isConnected ? shortAddr(address) : c.connect}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              aria-label={c.close}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={isConnected ? c.connected : c.title}
              className="relative w-full max-w-sm overflow-hidden rounded-[var(--radius-card)] border border-line-strong bg-bg-elev p-6 text-fg"
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={c.close}
                className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:text-fg"
              >
                <X size={16} />
              </button>

              {isConnected ? (
                <>
                  <h2 className="font-display text-2xl">{c.connected}</h2>
                  <p className="mt-3 break-all rounded-xl border border-line bg-bg px-4 py-3 font-mono text-xs text-fg-muted">
                    {address}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      disconnect();
                      setOpen(false);
                    }}
                    className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium transition-colors hover:bg-bg"
                  >
                    <SignOut size={16} />
                    {c.disconnect}
                  </button>
                </>
              ) : (
                <>
                  <h2 className="font-display text-2xl">{c.title}</h2>
                  <p className="mt-2 text-sm text-fg-muted">{c.body}</p>
                  <div className="mt-5 flex flex-col gap-3">
                    {connectors.map((connector) => {
                      const l = label(connector.id);
                      const unavailable = !connector.ready;
                      return (
                        <button
                          key={connector.id}
                          type="button"
                          disabled={unavailable || isLoading}
                          onClick={() => connect({ connector })}
                          className="flex items-center gap-3 rounded-2xl border border-line bg-bg px-4 py-3.5 text-left transition-colors hover:border-line-strong disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-fg-muted">
                            <Wallet size={18} />
                          </span>
                          <span className="min-w-0">
                            <span className="block text-sm font-medium">
                              {l.name}
                              {isLoading && pendingConnector?.id === connector.id ? "..." : ""}
                            </span>
                            <span className="block text-xs text-fg-faint">
                              {unavailable ? c.noInjected : l.hint}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {error && (
                    <p role="alert" className="mt-4 text-xs text-red-300">
                      {c.failed}
                    </p>
                  )}
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
