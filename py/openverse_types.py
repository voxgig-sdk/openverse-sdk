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
    alt_file: list
    attribution: str
    audio_set: Any
    detail_url: str
    display_name: str
    fields_matched: list
    id: str
    identifier: str
    indexed_on: str
    len: int
    license: str
    license_url: str
    logo_url: str
    mature: bool
    media_count: int
    point: list
    reason: Any
    related_url: str
    source_name: str
    source_url: str
    tag: list
    thumbnail: str
    waveform: str


class Audio(AudioRequired, total=False):
    bit_rate: int
    category: str
    creator: str
    creator_url: str
    description: str
    duration: int
    filesize: int
    filetype: str
    foreign_landing_url: str
    genre: list
    license_version: str
    provider: str
    sample_rate: int
    source: str
    title: str
    url: str


class AudioLoadMatch(TypedDict):
    identifier: str
    id: str


class AudioListMatch(TypedDict):
    identifier: str


class AudioCreateData(TypedDict):
    identifier: str


class ImageRequired(TypedDict):
    attribution: str
    author_name: str
    author_url: str
    detail_url: str
    display_name: str
    fields_matched: list
    id: str
    identifier: str
    indexed_on: str
    license: str
    license_url: str
    logo_url: str
    mature: bool
    media_count: int
    reason: Any
    related_url: str
    source_name: str
    source_url: str
    tag: list
    thumbnail: str
    type: Any
    version: Any


class Image(ImageRequired, total=False):
    category: str
    creator: str
    creator_url: str
    description: str
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


class ImageListMatch(TypedDict):
    identifier: str


class ImageCreateData(TypedDict):
    identifier: str


class OAuth2Application(TypedDict):
    description: str
    email: str
    name: str


class OAuth2ApplicationCreateData(TypedDict, total=False):
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


class OAuth2TokenCreateData(TypedDict, total=False):
    access_token: str
    expires_in: int
    scope: str
    token_type: str
