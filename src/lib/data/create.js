
let containerCreateDataDefaults= {
    "Hostname": "",
    "Domainname": "",
    "User": "",
    "AttachStdin": false,
    "AttachStdout": true,
    "AttachStderr": true,
    "Tty": false,
    "OpenStdin": false,
    "StdinOnce": false,
    "Env": [
        "FOO=bar",
        "BAZ=quux"
    ],
    "Cmd": [
        "date"
    ],
    "Entrypoint": "",
    "Image": "ubuntu",
    "Labels": {
        "com.example.vendor": "Acme",
        "com.example.license": "GPL",
        "com.example.version": "1.0"
    },
    "Volumes": {
        "/volumes/data": {}
    },
    "WorkingDir": "",
    "NetworkDisabled": false,
    "MacAddress": "12:34:56:78:9a:bc",
    "ExposedPorts": {
        "22/tcp": {}
    },
    "StopSignal": "SIGTERM",
    "HostConfig": {
        "Binds": ["/tmp:/tmp"],
        "Tmpfs": { "/run": "rw,noexec,nosuid,size=65536k" },
        "Links": ["redis3:redis"],
        "Memory": 0,
        "MemorySwap": 0,
        "MemoryReservation": 0,
        "KernelMemory": 0,
        "CpuShares": 512,
        "CpuPeriod": 100000,
        "CpuQuota": 50000,
        "CpusetCpus": "0,1",
        "CpusetMems": "0,1",
        "BlkioWeight": 300,
        "BlkioWeightDevice": [{}],
        "BlkioDeviceReadBps": [{}],
        "BlkioDeviceReadIOps": [{}],
        "BlkioDeviceWriteBps": [{}],
        "BlkioDeviceWriteIOps": [{}],
        "MemorySwappiness": 60,
        "OomKillDisable": false,
        "OomScoreAdj": 500,
        "PidMode": "",
        "PidsLimit": -1,
        "PortBindings": { "22/tcp": [{ "HostPort": "11022" }] },
        "PublishAllPorts": false,
        "Privileged": false,
        "ReadonlyRootfs": false,
        "Dns": ["8.8.8.8"],
        "DnsOptions": [""],
        "DnsSearch": [""],
        "ExtraHosts": null,
        "VolumesFrom": ["parent", "other:ro"],
        "CapAdd": ["NET_ADMIN"],
        "CapDrop": ["MKNOD"],
        "GroupAdd": ["newgroup"],
        "RestartPolicy": { "Name": "", "MaximumRetryCount": 0 },
        "NetworkMode": "bridge",
        "Devices": [],
        "Ulimits": [{}],
        "LogConfig": { "Type": "json-file", "Config": {} },
        "SecurityOpt": [],
        "CgroupParent": "",
        "VolumeDriver": "",
        "ShmSize": 67108864
    },
    "NetworkingConfig": {
        "EndpointsConfig": {
            "isolated_nw" : {
                "IPAMConfig": {
                    "IPv4Address":"172.20.30.33",
                    "IPv6Address":"2001:db8:abcd::3033"
                },
                "Links":["container_1", "container_2"],
                "Aliases":["server_x", "server_y"]
            }
        }
    }
}




exports.createContainerDefaults= containerCreateDataDefaults

exports.createServiceDefaults=createServiceDefault