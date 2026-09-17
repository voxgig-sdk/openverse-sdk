# Typed models for the Openverse SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class AudioRequired(TypedDict):
    alt_files: list
    attribution: str
    audio_set: Any
    detail_url: str
    fields_matched: list
    id: str
    indexed_on: str
    license: str
    license_url: str
    mature: bool
    related_url: str
    tags: list
    thumbnail: str
    waveform: str


class Audio(AudioRequired, total=False):
    bit_rate: int
    category: str
    creator: str
    creator_url: str
    duration: int
    filesize: int
    filetype: str
    foreign_landing_url: str
    genres: list
    license_version: str
    provider: str
    sample_rate: int
    source: str
    title: str
    url: str


class AudioLoadMatch(TypedDict):
    id: str


class AudioListMatch(TypedDict, total=False):
    category: str
    creator: str
    excluded_source: str
    extension: str
    filter_dead: bool
    length: str
    license: str
    license_type: str
    mature: bool
    page: int
    page_size: int
    peak: bool
    q: str
    source: str
    tag: str
    title: str
    unstable_authority: bool
    unstable_authority_boost: float
    unstable_collection: str
    unstable_include_sensitive_result: bool
    unstable_sort_by: str
    unstable_sort_dir: str
    unstable_tag: str


class AudioCreateDataRequired(TypedDict):
    identifier: str
    alt_files: list
    attribution: str
    audio_set: Any
    detail_url: str
    fields_matched: list
    id: str
    indexed_on: str
    license: str
    license_url: str
    mature: bool
    related_url: str
    tags: list
    thumbnail: str
    waveform: str


class AudioCreateData(AudioCreateDataRequired, total=False):
    bit_rate: int
    category: str
    creator: str
    creator_url: str
    duration: int
    filesize: int
    filetype: str
    foreign_landing_url: str
    genres: list
    license_version: str
    provider: str
    sample_rate: int
    source: str
    title: str
    url: str


class ImageRequired(TypedDict):
    attribution: str
    detail_url: str
    fields_matched: list
    id: str
    indexed_on: str
    license: str
    license_url: str
    mature: bool
    related_url: str
    tags: list
    thumbnail: str


class Image(ImageRequired, total=False):
    category: str
    creator: str
    creator_url: str
    filesize: int
    filetype: str
    foreign_landing_url: str
    height: int
    license_version: str
    provider: str
    source: str
    title: str
    url: str
    width: int


class ImageLoadMatch(TypedDict):
    id: str


class ImageListMatch(TypedDict, total=False):
    aspect_ratio: str
    category: str
    creator: str
    excluded_source: str
    extension: str
    filter_dead: bool
    license: str
    license_type: str
    mature: bool
    page: int
    page_size: int
    q: str
    size: str
    source: str
    tag: str
    title: str
    unstable_authority: bool
    unstable_authority_boost: float
    unstable_collection: str
    unstable_include_sensitive_result: bool
    unstable_sort_by: str
    unstable_sort_dir: str
    unstable_tag: str


class ImageCreateDataRequired(TypedDict):
    identifier: str
    attribution: str
    detail_url: str
    fields_matched: list
    id: str
    indexed_on: str
    license: str
    license_url: str
    mature: bool
    related_url: str
    tags: list
    thumbnail: str


class ImageCreateData(ImageCreateDataRequired, total=False):
    category: str
    creator: str
    creator_url: str
    filesize: int
    filetype: str
    foreign_landing_url: str
    height: int
    license_version: str
    provider: str
    source: str
    title: str
    url: str
    width: int


class OAuth2Application(TypedDict):
    description: str
    email: str
    name: str


class OAuth2ApplicationCreateData(TypedDict):
    description: str
    email: str
    name: str


class OAuth2KeyInfo(TypedDict):
    rate_limit_model: str
    requests_this_minute: int
    requests_today: int
    verified: bool


class OAuth2KeyInfoLoadMatch(TypedDict, total=False):
    rate_limit_model: str
    requests_this_minute: int
    requests_today: int
    verified: bool


class OAuth2Token(TypedDict):
    access_token: str
    expires_in: int
    scope: str
    token_type: str


class OAuth2TokenCreateData(TypedDict):
    access_token: str
    expires_in: int
    scope: str
    token_type: str
