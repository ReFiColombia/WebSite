"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { List, X } from "@phosphor-icons/react";
import { useLocale } from "next-intl";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";

function shortAddr(a?: string) {
  return a ? `${a.slice(0, 6)}...${a.slice(-4)}` : "";
}

function Navbar() {
  const locale = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { open: openModal } = useWeb3Modal();
  const { address, isConnected } = useAccount();

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isEs = locale === "es";
  const p = (path: string) => `/${locale}${path}`;
  const links = [
    { label: isEs ? "Inicio" : "Home", href: p("/") },
    { label: isEs ? "Préstamos" : "Lending", href: p("/lend-manager") },
    { label: isEs ? "Donar" : "Donate", href: p("/donate") },
    { label: isEs ? "Comunidad" : "Community", href: p("/community") },
    { label: "Blog", href: "https://blog.refimedellin.org/", external: true },
  ];

  const otherLocale = isEs ? "en" : "es";
  const otherPath = (pathname || `/${locale}`).replace(
    /^\/(es|en)/,
    `/${otherLocale}`,
  );

  if (!mounted) return null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid
          ? "border-b border-line bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between px-5 md:px-8">
        <Link
          href={p("/")}
          className="flex items-center gap-2.5"
          aria-label="ReFi Colombia"
        >
          <Image
            src="/refi-colombia-logo.png"
            alt="ReFi Colombia"
            width={132}
            height={132}
            priority
            className="h-9 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              target={l.external ? "_blank" : undefined}
              rel={l.external ? "noopener noreferrer" : undefined}
              className="text-sm text-fg-muted transition-colors hover:text-fg"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href={otherPath}
            className="text-sm font-medium text-fg-faint transition-colors hover:text-fg"
          >
            {otherLocale.toUpperCase()}
          </Link>
          <button
            type="button"
            onClick={() => openModal()}
            className="btn-aurora rounded-full px-5 py-2 text-sm font-medium transition-transform duration-200 active:scale-[0.97]"
          >
            {isConnected ? shortAddr(address) : isEs ? "Conectar" : "Connect"}
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg lg:hidden"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={20} /> : <List size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-line bg-bg px-5 pb-6 pt-2 lg:hidden"
          >
            <div className="flex flex-col">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  onClick={() => setOpen(false)}
                  className="border-b border-line py-3.5 text-base text-fg-muted"
                >
                  {l.label}
                </Link>
              ))}
              <div className="mt-5 flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    openModal();
                  }}
                  className="btn-aurora flex-1 rounded-full px-5 py-3 text-center text-base font-medium"
                >
                  {isConnected
                    ? shortAddr(address)
                    : isEs
                      ? "Conectar"
                      : "Connect"}
                </button>
                <Link
                  href={otherPath}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-line px-5 py-3 text-base text-fg-muted"
                >
                  {otherLocale.toUpperCase()}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;
