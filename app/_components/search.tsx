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
  UNSTABLE_ListLayout as ListLayout,
  UNSTABLE_Virtualizer as Virtualizer,
} from "react-aria-components";
import { faker } from "@faker-js/faker";

faker.seed(123456);

const items = faker.helpers.multiple(
  (_, index) => {
    return { id: faker.string.uuid(), label: [index + 1, faker.person.fullName()].join(" - ") };
  },
  { count: 10_000 },
);

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

  const layout = useMemo(() => {
    return new ListLayout({ rowHeight: 32 });
  }, []);

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
          Persons
        </Label>

        <div className="inline-grid grid-cols-[1fr_auto] items-center rounded-md border border-neutral-300 focus-within:outline-2 focus-within:outline-neutral-900">
          <Input className="px-3 py-1.5 outline-none" />
          <Button className="px-2 h-full">
            <span className="sr-only">Toggle</span>
            <ChevronDownIcon aria-hidden={true} className="size-5 shrink-0" />
          </Button>
        </div>

        <Popover className="shadow-lg rounded-md bg-white border border-neutral-300 min-w-[var(--trigger-width)]">
          <Virtualizer layout={layout}>
            <ListBox className="py-2 max-h-96 overflow-y-auto">
              {(item: Item) => {
                return (
                  <ListBoxItem className="cursor-default px-3 py-1 data-[focused]:bg-neutral-100 data-[selected]:bg-sky-50">
                    {item.label}
                  </ListBoxItem>
                );
              }}
            </ListBox>
          </Virtualizer>
        </Popover>
      </ComboBox>

      <Button
        className="px-4 py-2 rounded-md bg-neutral-900 border border-neutral-900 text-white font-semibold text-sm inlne-flex hover:bg-neutral-800 hover:border-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-900"
        onPress={() => {
          select(defaultSelectedKey);
        }}
      >
        Select Default
      </Button>
    </div>
  );
}
