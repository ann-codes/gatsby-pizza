import React from 'react';
import S from '@sanity/desk-tool/structure-builder';

export default function SideBar() {
  return S.list()
    .title(`Slick's Slices`)
    .items([
      S.listItem()
        .title(`HomePage`)
        .icon(() => <strong>🚀</strong>)
        .child(S.editor().schemaType('storeSettings').documentId('downtown')),
      ...S.documentTypeListItems().filter(
        (item) => item.getId() !== 'storeSettings'
      ),
    ]);
}
