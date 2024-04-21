import React from 'react';
import { View, Text } from 'react-native';
import axios from 'axios';

const ID_REGEX = /ID\:[^0-9]+[0-9]+[^0-9]/g;
const RESULT_REGEX = /[0-9]+\ files\ found/i;

function extractIds(html) {
  let ids = [];
  const idsResults = html.match(ID_REGEX);
  idsResults.reverse();
  let n = idsResults.length;
  while (n--) {
    const id = idsResults[n].replace(/[^0-9]/g, "");

    if (!parseInt(id))
      return false;

    ids.push(id);
  }
  return ids;
}

async function idFetch(options) {
  if (!options.mirror)
    throw new Error("No mirror provided to search function");

  else if (!options.query)
    throw new Error("No search query given");

  else if (options.query.length < 4)
    throw new Error("Search query must be at least four characters");

  if (!options.count || !parseInt(options.count))
    options.count = 10;

  let localoffset = 0;

  if (options.offset && typeof options.offset === 'number') {
    localoffset = options.offset;
  } else if (typeof options.offset === 'string') {
    localoffset = parseInt(options.offset);
  }

  const sort = options.sort_by || "def";
  const column = options.search_in || "def";
  const sortmode = options.reverse ? "DESC" : "ASC";
  const closestpage = localoffset ? Math.floor(localoffset / 25) + 1 : 1;

  const query = `${options.mirror}/search.php?&req=${encodeURIComponent(options.query)}&view=detailed&column=${column}&sort=${sort}&sortmode=${sortmode}&page=${closestpage}`;

  try {
    const response = await axios.get(query);
    // console.log("response", response.data);

    let results = response.data.match(RESULT_REGEX);
    if (results === null)
      throw new Error("Bad response: could not parse search results");
    else
      results = results[0];

    results = parseInt(results.replace(/^([0-9]*).*/, "$1"));

    if (results === 0)
      throw new Error(`No results for "${options.query}"`);

    else if (!results)
      throw new Error("Could not determine # of search results");

    let searchIds = extractIds(response.data);
    if (!searchIds)
      throw new Error("Failed to parse search results for IDs");

    while ((searchIds.length + 25 * (closestpage - 1)) < (options.count + options.offset)) {
      const query = `${options.mirror}/search.php?&req=${encodeURIComponent(options.query)}&view=detailed&column=${column}&sort=${sort}&sortmode=${sortmode}&page=${Math.floor(searchIds.length / 25) + closestpage}`;

      try {
        let page = await axios.get(query);

        const newIds = extractIds(page.data);

        if (!newIds)
          throw new Error("Failed to parse search results for IDs");
        else
          searchIds = searchIds.concat(newIds);
      } catch (err) {
        throw err;
      }
    }

    return searchIds;
  } catch (err) {
    throw err;
  }
}

export default async function LibgenSearch(options) {
  try {
    if (!options.offset)
      options.offset = options.offset || 0;

    let ids = await idFetch(options);

    if (ids.length > options.count) {
      if (options.offset) {
        const closestPage = Math.floor(options.offset / 25) + 1;
        const start = options.offset - (closestPage - 1) * 25;
        ids = ids.slice(start, start + options.count);
      } else {
        ids = ids.slice(0, options.count);
      }
    }

    const url = `${options.mirror}/json.php?ids=${ids.join(",")}&fields=*`;

    try {
      const response = await axios.get(url);
      // console.log("response from url", response);
      console.log("response from final url", response.data);
      // return JSON.parse(response.data);
      return response.data;
    } catch (err) {
      throw err;
    }
  } catch (err) {
    throw err;
  }
}
