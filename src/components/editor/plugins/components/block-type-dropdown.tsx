import { $createParagraphNode, $getSelection } from "lexical";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  INSERT_ORDERED_LIST_COMMAND,
  INSERT_UNORDERED_LIST_COMMAND,
  REMOVE_LIST_COMMAND,
} from "@lexical/list";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import {
  $createHeadingNode,
  $createQuoteNode,
  HeadingTagType,
} from "@lexical/rich-text";
import { $setBlocksType } from "@lexical/selection";

import { blockTypeToBlockName } from "./block-types";

interface BlockTypeDropdownProps {
  blockType: keyof typeof blockTypeToBlockName;
}

export default function BlockTypeDropdown({
  blockType,
}: BlockTypeDropdownProps) {
  const [editor] = useLexicalComposerContext();

  const formatHeading = (headingLevel: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createHeadingNode(headingLevel));
    });
  };

  const formatParagraph = () => {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createParagraphNode());
    });
  };

  const formatOrderedList = () => {
    if (blockType !== "number") {
      editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatUnorderedList = () => {
    if (blockType !== "bullet") {
      editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined);
    } else {
      editor.dispatchCommand(REMOVE_LIST_COMMAND, undefined);
    }
  };

  const formatQuote = () => {
    editor.update(() => {
      const selection = $getSelection();
      $setBlocksType(selection, () => $createQuoteNode());
    });
  };

  return (
    <Select
      value={blockType}
      onValueChange={(value) => {
        switch (value) {
          case "h1":
            formatHeading("h1");
            break;
          case "h2":
            formatHeading("h2");
            break;
          case "h3":
            formatHeading("h3");
            break;
          case "h4":
            formatHeading("h4");
            break;
          case "h5":
            formatHeading("h5");
            break;
          case "h6":
            formatHeading("h6");
            break;
          case "paragraph":
            formatParagraph();
            break;
          case "number":
            formatOrderedList();
            break;
          case "bullet":
            formatUnorderedList();
            break;
          case "quote":
            formatQuote();
            break;
        }
      }}
    >
      <SelectTrigger className="w-40">
        <SelectValue placeholder="Block Type" />
      </SelectTrigger>

      <SelectContent>
        {Object.keys(blockTypeToBlockName).map((blockType) => {
          return (
            <SelectItem key={blockType} value={blockType}>
              {blockTypeToBlockName[blockType]}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
}
