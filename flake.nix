{
  inputs = {
    nixpkgs.url = "github:cachix/devenv-nixpkgs/rolling";
    systems.url = "github:nix-systems/default";
    devenv.url = "github:cachix/devenv";
    devenv.inputs.nixpkgs.follows = "nixpkgs";
  };

  nixConfig = {
    extra-trusted-public-keys = "devenv.cachix.org-1:w1cLUi8dv3hnoSPGAuibQv+f9TZLr6cv/Hm9XgU50cw=";
    extra-substituters = "https://devenv.cachix.org";
  };

  outputs = { self, nixpkgs, devenv, systems, ... } @ inputs:
    let
      forEachSystem = nixpkgs.lib.genAttrs (import systems);
    in
    {
      packages = forEachSystem (system: {
        devenv-up = self.devShells.${system}.default.config.procfileScript;
      });

      devShells = forEachSystem
        (system:
          let
            pkgs = nixpkgs.legacyPackages.${system};
            packagesModule = {
              packages = [ pkgs.yarn-berry ];
            };
          in
          {
            ci = devenv.lib.mkShell {
              inherit inputs pkgs;
              modules = [
                packagesModule
              ];
            };
            default = devenv.lib.mkShell {
              inherit inputs pkgs;
              modules = [
                packagesModule
                {
                  # https://devenv.sh/reference/options/
                  scripts = {
                    strapi.exec = "yarn exec strapi $@";
                    install.exec = ''
                      yarn install
                      bash -c 'cd playground && yarn install'
                    '';
                  };

                  processes.watch-link.exec = "yarn watch:link";
                  processes.playground.exec = "cd playground && yarn develop --watch-admin";

                  pre-commit.hooks = {
                    prettier.enable = true;
                  };
                }
              ];
            };
          });
    };
}
