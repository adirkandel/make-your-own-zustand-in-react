import * as React from "react";
import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";
import Prism from "prismjs";
import "prismjs/components/prism-jsx";
import "prismjs/components/prism-tsx";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism-tomorrow.css";
import "./code-block.css";

interface CodeBlockProps extends React.HTMLAttributes<HTMLPreElement> {
  language?: string;
}

const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, language = "typescript", children, ...props }, ref) => {
    const codeRef = useRef<HTMLElement>(null);

    useEffect(() => {
      if (codeRef.current) {
        Prism.highlightElement(codeRef.current);
      }
    }, [children, language]);

    const prismLanguage = language === "tsx" || language === "jsx" || language === "ts" 
      ? language 
      : language === "javascript" ? "js" : language;

    return (
      <pre
        ref={ref}
        className={cn(
          "relative rounded-lg bg-slate-950 p-4 text-sm text-slate-50 overflow-x-auto",
          className
        )}
        {...props}
      >
        {language && (
          <div className="absolute top-3 right-3 text-xs text-slate-400 bg-slate-800 px-2 py-1 rounded">
            {language}
          </div>
        )}
        <code ref={codeRef} className={`language-${prismLanguage} font-mono`}>
          {typeof children === "string" ? children : String(children)}
        </code>
      </pre>
    );
  }
);
CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
