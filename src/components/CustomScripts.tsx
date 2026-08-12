"use client";

import { useEffect, useRef } from "react";

type CustomScriptsProps = {
  html?: string | null;
  location: "head" | "body";
};

export default function CustomScripts({ html, location }: CustomScriptsProps) {
  const injectedRef = useRef(false);

  useEffect(() => {
    if (!html?.trim() || injectedRef.current) {
      return;
    }

    const target = location === "head" ? document.head : document.body;

    const template = document.createElement("template");

    template.innerHTML = html.trim();

    const addedNodes: Node[] = [];

    Array.from(template.content.childNodes).forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE && !node.textContent?.trim()) {
        return;
      }

      if (node.nodeType === Node.ELEMENT_NODE && (node as Element).tagName.toLowerCase() === "script") {
        const oldScript = node as HTMLScriptElement;

        const newScript = document.createElement("script");

        Array.from(oldScript.attributes).forEach((attribute) => {
          newScript.setAttribute(attribute.name, attribute.value);
        });

        if (oldScript.textContent) {
          newScript.textContent = oldScript.textContent;
        }

        target.appendChild(newScript);

        addedNodes.push(newScript);

        return;
      }

      const clonedNode = node.cloneNode(true);

      target.appendChild(clonedNode);

      addedNodes.push(clonedNode);
    });

    injectedRef.current = true;
  }, [html, location]);

  return null;
}
