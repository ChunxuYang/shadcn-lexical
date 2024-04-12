"use client";

import React from "react";

import InitialEditorState from "@/lib/initial-editor-state.json";
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

    theme: {
      text: {
        underline: "underline",
      },
    },

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

    editorState: JSON.stringify(InitialEditorState),

    onError: (error) => {
      console.error(error);
    },
  };

  return (
    <LexicalComposer initialConfig={config}>
      <div
        className={`mx-auto relative flex flex-col mt-10 border shadow rounded-lg prose dark:prose-invert`}
      >
        <ToolbarPlugin />

        <div className="relative">
          <RichTextPlugin
            contentEditable={
              <ContentEditable className="focus:outline-none w-full px-8 py-4 h-[500px] overflow-auto relative" />
            }
            placeholder={
              <p className="text-muted-foreground absolute top-0 px-8 py-4 w-full pointer-events-none">
                Enter some text...
              </p>
            }
            ErrorBoundary={LexicalErrorBoundary}
          />
          <HistoryPlugin />
        </div>
        {/* <AutoFocusPlugin /> */}
        <ListPlugin />
        <LinkPlugin />

        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
      </div>
    </LexicalComposer>
  );
};

export default Editor;
