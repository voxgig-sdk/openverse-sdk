# Typed models for the Openverse SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Audio:
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
    bit_rate: Optional[int] = None
    category: Optional[str] = None
    creator: Optional[str] = None
    creator_url: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[int] = None
    filesize: Optional[int] = None
    filetype: Optional[str] = None
    foreign_landing_url: Optional[str] = None
    genre: Optional[list] = None
    license_version: Optional[str] = None
    provider: Optional[str] = None
    sample_rate: Optional[int] = None
    source: Optional[str] = None
    title: Optional[str] = None
    url: Optional[str] = None


@dataclass
class AudioLoadMatch:
    identifier: str
    id: str


@dataclass
class AudioListMatch:
    identifier: str


@dataclass
class AudioCreateData:
    identifier: str


@dataclass
class Image:
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
    category: Optional[str] = None
    creator: Optional[str] = None
    creator_url: Optional[str] = None
    description: Optional[str] = None
    filesize: Optional[int] = None
    filetype: Optional[str] = None
    foreign_landing_url: Optional[str] = None
    height: Optional[int] = None
    license_version: Optional[str] = None
    provider: Optional[str] = None
    source: Optional[str] = None
    title: Optional[str] = None
    url: Optional[str] = None
    width: Optional[int] = None


@dataclass
class ImageLoadMatch:
    id: str


@dataclass
class ImageListMatch:
    identifier: str


@dataclass
class ImageCreateData:
    identifier: str


@dataclass
class OAuth2Application:
    description: str
    email: str
    name: str


@dataclass
class OAuth2ApplicationCreateData:
    description: Optional[str] = None
    email: Optional[str] = None
    name: Optional[str] = None


@dataclass
class OAuth2KeyInfo:
    rate_limit_model: str
    requests_this_minute: int
    requests_today: int
    verified: bool


@dataclass
class OAuth2KeyInfoLoadMatch:
    rate_limit_model: Optional[str] = None
    requests_this_minute: Optional[int] = None
    requests_today: Optional[int] = None
    verified: Optional[bool] = None


@dataclass
class OAuth2Token:
    access_token: str
    expires_in: int
    scope: str
    token_type: str


@dataclass
class OAuth2TokenCreateData:
    access_token: Optional[str] = None
    expires_in: Optional[int] = None
    scope: Optional[str] = None
    token_type: Optional[str] = None

