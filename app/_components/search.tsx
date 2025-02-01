"use client";

import type { MenuTriggerAction } from "@react-types/combobox";
import { ChevronDownIcon } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import {
  Button,
  ComboBox,
  Input,
  type Key,
  Label,
  ListBox,
  ListBoxItem,
  Popover,
  useFilter,
} from "react-aria-components";

const items = [
  { id: "ackee", label: "Ackee" },
  { id: "apricot", label: "Apricot" },
  { id: "apple", label: "Apple" },
  { id: "bilberry", label: "Bilberry" },
  { id: "blackberry", label: "Blackberry" },
  { id: "blueberry", label: "Blueberry" },
  { id: "boysenberry", label: "Boysenberry" },
  { id: "calamansi", label: "Calamansi" },
  { id: "cantaloupe", label: "Cantaloupe" },
  { id: "chayote", label: "Chayote" },
  { id: "cherry", label: "Cherry" },
  { id: "clementine", label: "Clementine" },
  { id: "cloudberry", label: "Cloudberry" },
  { id: "coconut", label: "Coconut" },
  { id: "cranberry", label: "Cranberry" },
  { id: "date", label: "Date" },
  { id: "dragonfruit", label: "Dragonfruit" },
  { id: "durian", label: "Durian" },
  { id: "elderberry", label: "Elderberry" },
  { id: "feijoa", label: "Feijoa" },
  { id: "fig", label: "Fig" },
  { id: "finger-lime", label: "Finger Lime" },
  { id: "genip", label: "Genip" },
  { id: "gooseberry", label: "Gooseberry" },
  { id: "grape", label: "Grape" },
  { id: "grapefruit", label: "Grapefruit" },
  { id: "grumichama", label: "Grumichama" },
  { id: "guava", label: "Guava" },
  { id: "honeydew", label: "Honeydew" },
  { id: "horned-melon", label: "Horned Melon" },
  { id: "ilama", label: "Ilama" },
  { id: "jabuticaba", label: "Jabuticaba" },
  { id: "jackfruit", label: "Jackfruit" },
  { id: "jostaberry", label: "Jostaberry" },
  { id: "kabosu", label: "Kabosu" },
  { id: "kiwi", label: "Kiwi" },
  { id: "kiwano", label: "Kiwano" },
  { id: "kumquat", label: "Kumquat" },
  { id: "langsat", label: "Langsat" },
  { id: "lemon", label: "Lemon" },
  { id: "lime", label: "Lime" },
  { id: "longan", label: "Longan" },
  { id: "loquat", label: "Loquat" },
  { id: "lucuma", label: "Lucuma" },
  { id: "lychee", label: "Lychee" },
  { id: "mamey-sapote", label: "Mamey Sapote" },
  { id: "mamoncillo", label: "Mamoncillo" },
  { id: "mango", label: "Mango" },
  { id: "mangosteen", label: "Mangosteen" },
  { id: "mandarin", label: "Mandarin" },
  { id: "marionberry", label: "Marionberry" },
  { id: "medlar", label: "Medlar" },
  { id: "miracle-fruit", label: "Miracle Fruit" },
  { id: "monstera-deliciosa", label: "Monstera Deliciosa" },
  { id: "mulberry", label: "Mulberry" },
  { id: "nectarine", label: "Nectarine" },
  { id: "olive", label: "Olive" },
  { id: "orange", label: "Orange" },
  { id: "papaya", label: "Papaya" },
  { id: "passionfruit", label: "Passionfruit" },
  { id: "pawpaw", label: "Pawpaw" },
  { id: "peach", label: "Peach" },
  { id: "pear", label: "Pear" },
  { id: "persimmon", label: "Persimmon" },
  { id: "pineapple", label: "Pineapple" },
  { id: "pitaya", label: "Pitaya" },
  { id: "plum", label: "Plum" },
  { id: "pomegranate", label: "Pomegranate" },
  { id: "pomelo", label: "Pomelo" },
  { id: "prickly-pear", label: "Prickly Pear" },
  { id: "pulasan", label: "Pulasan" },
  { id: "quince", label: "Quince" },
  { id: "rambutan", label: "Rambutan" },
  { id: "raspberry", label: "Raspberry" },
  { id: "redcurrant", label: "Redcurrant" },
  { id: "salak", label: "Salak" },
  { id: "salmonberry", label: "Salmonberry" },
  { id: "santol", label: "Santol" },
  { id: "sapodilla", label: "Sapodilla" },
  { id: "satsuma", label: "Satsuma" },
  { id: "serviceberry", label: "Serviceberry" },
  { id: "soncoya", label: "Soncoya" },
  { id: "soursop", label: "Soursop" },
  { id: "starfruit", label: "Starfruit" },
  { id: "strawberry", label: "Strawberry" },
  { id: "sugar-apple", label: "Sugar Apple" },
  { id: "sweetsop", label: "Sweetsop" },
  { id: "tamarind", label: "Tamarind" },
  { id: "tangelo", label: "Tangelo" },
  { id: "tangerine", label: "Tangerine" },
  { id: "ugli-fruit", label: "Ugli Fruit" },
  { id: "ugni", label: "Ugni" },
  { id: "voavanga", label: "Voavanga" },
  { id: "watermelon", label: "Watermelon" },
  { id: "wax-apple", label: "Wax Apple" },
  { id: "white-currant", label: "White Currant" },
  { id: "white-mulberry", label: "White Mulberry" },
  { id: "white-sapote", label: "White Sapote" },
  { id: "yangmei", label: "Yangmei" },
  { id: "yellow-passion-fruit", label: "Yellow Passion Fruit" },
  { id: "youngberry", label: "Youngberry" },
  { id: "yumberry", label: "Yumberry" },
  { id: "yuzu", label: "Yuzu" },
  { id: "ziziphus", label: "Ziziphus" },
  { id: "zucchini", label: "Zucchini" },
];

type Item = (typeof items)[number];

function getLabel(id: Key | null) {
  if (id === null) return "";
  return items.find((item) => item.id === id)?.label ?? "";
}

const defaultSelectedKey = items[0].id;

export function Search(): ReactNode {
  const [selectedKey, setSelectedKey] = useState<Key | null>(defaultSelectedKey);
  const [searchTerm, setSearchTerm] = useState(getLabel(selectedKey));
  const [menuTrigger, setMenuTrigger] = useState<MenuTriggerAction | null>(null);
  const { contains } = useFilter({ sensitivity: "base" });

  function select(id: Key | null) {
    setSelectedKey(id);
    setSearchTerm(getLabel(id));
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => contains(item.label, searchTerm));
  }, [items, searchTerm]);

  return (
    <div className="p-8 grid gap-y-8 justify-start">
      <div>
        <pre>Selected key: {selectedKey}</pre>
        <pre>Search term: {searchTerm}</pre>
      </div>

      <ComboBox
        className="inline-grid gap-y-1 justify-start"
        inputValue={searchTerm}
        items={menuTrigger === "manual" ? items : filteredItems}
        onInputChange={(searchTerm) => {
          setSearchTerm(searchTerm);
          setMenuTrigger("input");
        }}
        onOpenChange={(_isOpen, menuTrigger) => {
          setMenuTrigger(menuTrigger ?? null);
        }}
        onSelectionChange={(id: Key | null) => {
          select(id);
        }}
        selectedKey={selectedKey}
      >
        <Label className="text-xs font-semibold text-neutral-600 uppercase tracking-wider">
          Fruits
        </Label>

        <div className="inline-grid grid-cols-[1fr_auto] items-center rounded-md border border-neutral-300 focus-within:outline-2 focus-within:outline-neutral-900">
          <Input className="px-3 py-1.5 outline-none" />
          <Button className="px-2 h-full">
            <span className="sr-only">Toggle</span>
            <ChevronDownIcon aria-hidden={true} className="size-5 shrink-0" />
          </Button>
        </div>

        <Popover className="shadow-lg rounded-md bg-white border border-neutral-300 min-w-[var(--trigger-width)]">
          <ListBox className="py-2 max-h-96 overflow-y-auto">
            {(item: Item) => {
              return (
                <ListBoxItem className="cursor-default px-3 py-1 data-[focused]:bg-neutral-100 data-[selected]:bg-sky-50">
                  {item.label}
                </ListBoxItem>
              );
            }}
          </ListBox>
        </Popover>
      </ComboBox>

      <Button
        className="px-4 py-2 rounded-md bg-neutral-900 border border-neutral-900 text-white font-semibold text-sm inlne-flex hover:bg-neutral-800 hover:border-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        onPress={() => {
          select("orange");
        }}
      >
        Select Orange
      </Button>
    </div>
  );
}
