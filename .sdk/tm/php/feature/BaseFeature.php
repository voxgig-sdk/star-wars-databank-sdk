<?php
declare(strict_types=1);

// StarWarsDatabank SDK base feature

class StarWarsDatabankBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(StarWarsDatabankContext $ctx, array $options): void {}
    public function PostConstruct(StarWarsDatabankContext $ctx): void {}
    public function PostConstructEntity(StarWarsDatabankContext $ctx): void {}
    public function SetData(StarWarsDatabankContext $ctx): void {}
    public function GetData(StarWarsDatabankContext $ctx): void {}
    public function GetMatch(StarWarsDatabankContext $ctx): void {}
    public function SetMatch(StarWarsDatabankContext $ctx): void {}
    public function PrePoint(StarWarsDatabankContext $ctx): void {}
    public function PreSpec(StarWarsDatabankContext $ctx): void {}
    public function PreRequest(StarWarsDatabankContext $ctx): void {}
    public function PreResponse(StarWarsDatabankContext $ctx): void {}
    public function PreResult(StarWarsDatabankContext $ctx): void {}
    public function PreDone(StarWarsDatabankContext $ctx): void {}
    public function PreUnexpected(StarWarsDatabankContext $ctx): void {}
}
