#!/usr/bin/env python3
# This script implements the MAC address retrieval functionality from the provided attachment

import scapy.all as scapy
import argparse

def get_mac(ip):
    """Get MAC address of a device given its IP address using ARP protocol"""
    arp_request = scapy.ARP(pdst=ip)
    broadcast = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
    arp_request_broadcast = broadcast / arp_request
    answered_list = scapy.srp(arp_request_broadcast, timeout=1, verbose=False)[0]
    
    for element in answered_list:
        return element[1].hwsrc
    return None

def scan_network(ip_range):
    """Scan a network range and return a list of devices with their IP and MAC addresses"""
    arp_request = scapy.ARP(pdst=ip_range)
    broadcast = scapy.Ether(dst="ff:ff:ff:ff:ff:ff")
    arp_request_broadcast = broadcast / arp_request
    answered_list = scapy.srp(arp_request_broadcast, timeout=1, verbose=False)[0]
    
    devices = []
    for element in answered_list:
        device = {
            "ip": element[1].psrc,
            "mac": element[1].hwsrc
        }
        devices.append(device)
    
    return devices

def main():
    parser = argparse.ArgumentParser(description="Network scanner to get MAC addresses")
    parser.add_argument("target", help="Target IP address or range (CIDR notation)")
    args = parser.parse_args()
    
    try:
        if "/" in args.target:  # IP range
            devices = scan_network(args.target)
            print("IP\t\t\tMAC Address")
            print("-" * 50)
            for device in devices:
                print(f"{device['ip']}\t\t{device['mac']}")
        else:  # Single IP
            mac = get_mac(args.target)
            if mac:
                print(f"MAC address for {args.target}: {mac}")
            else:
                print(f"Could not get MAC address for {args.target}")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()

