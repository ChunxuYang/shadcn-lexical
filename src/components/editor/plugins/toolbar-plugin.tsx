import {
    $getSelection, $isRangeSelection, CAN_REDO_COMMAND, CAN_UNDO_COMMAND, COMMAND_PRIORITY_CRITICAL,
    FORMAT_TEXT_COMMAND, REDO_COMMAND, SELECTION_CHANGE_COMMAND, UNDO_COMMAND
} from 'lexical';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Toggle } from '@/components/ui/toggle';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { mergeRegister } from '@lexical/utils';
import { FontBoldIcon, FontItalicIcon, ReloadIcon, UnderlineIcon } from '@radix-ui/react-icons';

export default function ToolbarPlugin() {
  const [editor] = useLexicalComposerContext();
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);

  const [canUndo, setCanUndo] = useState<boolean>(false);
  const [canRedo, setCanRedo] = useState<boolean>(false);

  const $updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat("bold"));
      setIsItalic(selection.hasFormat("italic"));
      setIsUnderline(selection.hasFormat("underline"));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          $updateToolbar();
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          $updateToolbar();
        });
      })
    );
  }, [editor, $updateToolbar]);

  useEffect(() => {
    return mergeRegister(
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        COMMAND_PRIORITY_CRITICAL
      )
    );
  }, [editor]);

  return (
    <div className="w-full border-b z-10 relative">
      <div className="flex space-x-2 justify-center p-1">
        <Button
          className="h-8 px-2"
          variant={"ghost"}
          disabled={!canUndo}
          onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        >
          {/* reload flip to left */}
          <ReloadIcon className="transform -scale-x-100" />
        </Button>

        <Button
          className="h-8 px-2"
          variant={"ghost"}
          disabled={!canRedo}
          onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        >
          <ReloadIcon />
        </Button>

        <Separator orientation="vertical" className="h-auto my-1" />

        <Toggle
          area-label="Bold"
          size="sm"
          pressed={isBold}
          onPressedChange={(pressed) => {
            console.log(editor.getEditorState().toJSON());
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "bold");
            setIsBold(pressed);
          }}
        >
          <FontBoldIcon />
        </Toggle>

        <Toggle
          area-label="Italic"
          size="sm"
          pressed={isItalic}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "italic");
            setIsItalic(pressed);
          }}
        >
          <FontItalicIcon />
        </Toggle>

        <Toggle
          area-label="Underline"
          size="sm"
          pressed={isUnderline}
          onPressedChange={(pressed) => {
            editor.dispatchCommand(FORMAT_TEXT_COMMAND, "underline");
            setIsUnderline(pressed);
          }}
        >
          <UnderlineIcon />
        </Toggle>
      </div>
    </div>
  );
}
