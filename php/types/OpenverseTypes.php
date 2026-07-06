<?php
declare(strict_types=1);

// Typed models for the Openverse SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Audio entity data model. */
class Audio
{
    public array $alt_file;
    public string $attribution;
    public mixed $audio_set;
    public ?int $bit_rate = null;
    public ?string $category = null;
    public ?string $creator = null;
    public ?string $creator_url = null;
    public ?string $description = null;
    public string $detail_url;
    public string $display_name;
    public ?int $duration = null;
    public array $fields_matched;
    public ?int $filesize = null;
    public ?string $filetype = null;
    public ?string $foreign_landing_url = null;
    public ?array $genre = null;
    public string $id;
    public string $identifier;
    public string $indexed_on;
    public int $len;
    public string $license;
    public string $license_url;
    public ?string $license_version = null;
    public string $logo_url;
    public bool $mature;
    public int $media_count;
    public array $point;
    public ?string $provider = null;
    public mixed $reason;
    public string $related_url;
    public ?int $sample_rate = null;
    public ?string $source = null;
    public string $source_name;
    public string $source_url;
    public array $tag;
    public string $thumbnail;
    public ?string $title = null;
    public ?string $url = null;
    public string $waveform;
}

/** Request payload for Audio#load. */
class AudioLoadMatch
{
    public string $identifier;
    public string $id;
}

/** Request payload for Audio#list. */
class AudioListMatch
{
    public string $identifier;
}

/** Request payload for Audio#create. */
class AudioCreateData
{
    public string $identifier;
}

/** Image entity data model. */
class Image
{
    public string $attribution;
    public string $author_name;
    public string $author_url;
    public ?string $category = null;
    public ?string $creator = null;
    public ?string $creator_url = null;
    public ?string $description = null;
    public string $detail_url;
    public string $display_name;
    public array $fields_matched;
    public ?int $filesize = null;
    public ?string $filetype = null;
    public ?string $foreign_landing_url = null;
    public ?int $height = null;
    public string $id;
    public string $identifier;
    public string $indexed_on;
    public string $license;
    public string $license_url;
    public ?string $license_version = null;
    public string $logo_url;
    public bool $mature;
    public int $media_count;
    public ?string $provider = null;
    public mixed $reason;
    public string $related_url;
    public ?string $source = null;
    public string $source_name;
    public string $source_url;
    public array $tag;
    public string $thumbnail;
    public ?string $title = null;
    public mixed $type;
    public ?string $url = null;
    public mixed $version;
    public ?int $width = null;
}

/** Request payload for Image#load. */
class ImageLoadMatch
{
    public string $id;
}

/** Request payload for Image#list. */
class ImageListMatch
{
    public string $identifier;
}

/** Request payload for Image#create. */
class ImageCreateData
{
    public string $identifier;
}

/** OAuth2Application entity data model. */
class OAuth2Application
{
    public string $description;
    public string $email;
    public string $name;
}

/** Request payload for OAuth2Application#create. */
class OAuth2ApplicationCreateData
{
    public string $description;
    public string $email;
    public string $name;
}

/** OAuth2KeyInfo entity data model. */
class OAuth2KeyInfo
{
    public string $rate_limit_model;
    public int $requests_this_minute;
    public int $requests_today;
    public bool $verified;
}

/** Request payload for OAuth2KeyInfo#load. */
class OAuth2KeyInfoLoadMatch
{
    public ?string $rate_limit_model = null;
    public ?int $requests_this_minute = null;
    public ?int $requests_today = null;
    public ?bool $verified = null;
}

/** OAuth2Token entity data model. */
class OAuth2Token
{
    public string $access_token;
    public int $expires_in;
    public string $scope;
    public string $token_type;
}

/** Request payload for OAuth2Token#create. */
class OAuth2TokenCreateData
{
    public string $access_token;
    public int $expires_in;
    public string $scope;
    public string $token_type;
}

