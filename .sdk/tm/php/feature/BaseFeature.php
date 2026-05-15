<?php
declare(strict_types=1);

// Openverse SDK base feature

class OpenverseBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(OpenverseContext $ctx, array $options): void {}
    public function PostConstruct(OpenverseContext $ctx): void {}
    public function PostConstructEntity(OpenverseContext $ctx): void {}
    public function SetData(OpenverseContext $ctx): void {}
    public function GetData(OpenverseContext $ctx): void {}
    public function GetMatch(OpenverseContext $ctx): void {}
    public function SetMatch(OpenverseContext $ctx): void {}
    public function PrePoint(OpenverseContext $ctx): void {}
    public function PreSpec(OpenverseContext $ctx): void {}
    public function PreRequest(OpenverseContext $ctx): void {}
    public function PreResponse(OpenverseContext $ctx): void {}
    public function PreResult(OpenverseContext $ctx): void {}
    public function PreDone(OpenverseContext $ctx): void {}
    public function PreUnexpected(OpenverseContext $ctx): void {}
}
