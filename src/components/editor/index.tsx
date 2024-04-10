"use client";

import React from "react";

import { CodeHighlightNode, CodeNode } from "@lexical/code";
import { AutoLinkNode, LinkNode } from "@lexical/link";
import { ListItemNode, ListNode } from "@lexical/list";
import { TRANSFORMERS } from "@lexical/markdown";
import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer";
import { ContentEditable } from "@lexical/react/LexicalContentEditable";
import LexicalErrorBoundary from "@lexical/react/LexicalErrorBoundary";
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin";
import { LinkPlugin } from "@lexical/react/LexicalLinkPlugin";
import { ListPlugin } from "@lexical/react/LexicalListPlugin";
import { MarkdownShortcutPlugin } from "@lexical/react/LexicalMarkdownShortcutPlugin";
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin";
import { HeadingNode, QuoteNode } from "@lexical/rich-text";

import ToolbarPlugin from "./plugins/toolbar-plugin";

const Editor: React.FC = () => {
  const config: InitialConfigType = {
    namespace: "lexical-editor",

    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,

      AutoLinkNode,
      LinkNode,
    ],

    onError: (error) => {
      console.error(error);
    },
  };

  return (
    <LexicalComposer initialConfig={config}>
      <div className={`mx-auto relative prose dark:prose-invert`}>
        <RichTextPlugin
          contentEditable={
            <ContentEditable className="focus:outline-none w-full mt-10 p-8 pt-12 h-[500px] overflow-auto relative rounded-lg shadow border" />
          }
          placeholder={
            <p className="text-muted-foreground absolute top-0 p-8 pt-12 w-full pointer-events-none">
              Enter some text...
            </p>
          }
          ErrorBoundary={LexicalErrorBoundary}
        />
        <HistoryPlugin />
        {/* <AutoFocusPlugin /> */}
        <ListPlugin />
        <LinkPlugin />

        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />

        <ToolbarPlugin />
      </div>
    </LexicalComposer>
  );
};

export default Editor;
