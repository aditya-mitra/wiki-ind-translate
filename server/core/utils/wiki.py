from typing import List, Optional
from wikipediaapi import Wikipedia
from pysbd import Segmenter

wiki = Wikipedia("en")
seg = Segmenter(language="en", clean=False)


def getWikiSummary(title: str) -> Optional[str]:
    wiki_page = wiki.page(title)

    if not wiki_page.exists():
        return None

    summary = wiki_page.summary

    # if 'may refer to' in summary or 'may also refer to' in summary:
    #     return None

    return summary


def getSplittedSummary(title: str) -> Optional[List[str]]:

    summary = getWikiSummary(title)

    if not summary:
        return None

    return seg.segment(summary)
